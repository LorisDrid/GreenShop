const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const ExpressBrute = require("express-brute");
const usersRouter = require("./users");
const User = require("../models/user");

router.use(cookieParser());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many requests, please try again later",
});

router.use(globalLimiter);

const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000,
  maxWait: 15 * 60 * 1000,
  failCallback: (req, res, next, nextValidRequestDate) => {
    res.status(429).json({
      error: "Too many failed login attempts, please try again later",
    });
  },
});

const validatePassword = (password) => {
  const maxLength = 20;
  const regex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;

  if (password.length > maxLength) {
    return { isValid: false, error: "Password too long" };
  }

  if (!regex.test(password)) {
    return { isValid: false, error: "Invalid password format" };
  }

  return { isValid: true };
};

router.post("/signup", async (req, res) => {
  const { email, phoneNumber, password, role, adminSecret } = req.body;

  if (!["seller", "buyer", "administrator"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  if (
    role === "administrator" &&
    adminSecret !== process.env.ADMIN_SECRET_KEY
  ) {
    return res.status(403).json({ error: "Invalid admin secret" });
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return res.status(400).json({ error: passwordValidation.error });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body = {
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    };
    await usersRouter.createUser(req, res);
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", bruteforce.prevent, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    bruteforce.reset(req.ip);

    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3m",
      },
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/validate-token", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err) => {
    if (err) {
      refreshToken(req, res);
    } else {
      res.status(200).json({ message: "Token is valid" });
    }
  });
});

function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not provided" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token" });
    } else {
      const accessToken = jwt.sign(
        {
          username: decoded.username,
          email: decoded.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3m",
        },
      );
      res.json({ accessToken, message: "Token refreshed successfully" });
    }
  });
}

module.exports = router;
