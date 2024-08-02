const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
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
    return "Password too long";
  }

  if (!regex.test(password)) {
    return "Invalid password format";
  }

  return null;
};

// const transporter = nodemailer.createTransport({
//   service: "gmail", // ou tout autre service de votre choix
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendVerificationEmail = async (email, verificationToken) => {
//   const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Email Verification",
//     html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
//   };

//   await transporter.sendMail(mailOptions);
// };

router.post("/signup", async (req, res) => {
  const { email, phoneNumber, password, role, adminSecret } = req.body;

  // console.log(`Received signup request for email: ${email}`);

  if (!["seller", "buyer", "administrator"].includes(role)) {
    console.error(`Invalid role provided: ${role}`);
    return res.status(400).json({ error: "Invalid role" });
  }

  if (
    role === "administrator" &&
    adminSecret !== process.env.ADMIN_SECRET_KEY
  ) {
    console.error(`Invalid admin secret provided`);
    return res.status(403).json({ error: "Invalid admin secret" });
  }

  const validationError = validatePassword(password);
  if (validationError) {
    console.error(`Validation error: ${validationError.error}`);
    return res.status(400).json({ error: validationError });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = jwt.sign(
      { email, phoneNumber, password: hashedPassword, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // console.log(`Sending verification email to: ${email}`);
    // await sendVerificationEmail(email, verificationToken);

    res
      .status(201)
      .json({ message: "Verification email sent, please check your inbox." });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.get("/verify-email", async (req, res) => {
//   const { token } = req.query;

//   console.log(`Received email verification request with token: ${token}`);

//   if (!token) {
//     console.log(`No token provided`);
//     return res.status(400).json({ error: "Missing token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const { email, phoneNumber, password, role } = decoded;

//     console.log(`Creating new user with email: ${email}`);
//     const user = new User({
//       email,
//       phoneNumber,
//       password,
//       role,
//     });

//     await user.save();

//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (error) {
//     console.error("Error verifying email:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

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
