// app.js
const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./database");

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

const usersRouter = require("./routes/users").router;
app.use("/users", usersRouter);

const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

const ordersRouter = require("./routes/orders");
app.use("/orders", ordersRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
