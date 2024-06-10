// app.js
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;
const mongoURI = process.env.MONGODB_URI;
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB successfully !");

    const usersRouter = require("./routes/users").router;
    app.use("/user s", usersRouter);

    const itemsRouter = require("./routes/items");
    app.use("/items", itemsRouter);

    const ordersRouter = require("./routes/orders");
    app.use("/orders", ordersRouter);

    const authRouter = require("./routes/auth");
    app.use("/auth", authRouter);

    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to the database", error);
    process.exit(1);
  });
