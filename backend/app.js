// app.js
const express = require("express");
const { connectToDatabase } = require("./database");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Importez et utilisez le routeur des utilisateurs
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
