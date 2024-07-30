const express = require("express");
const app = express();
const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");
const cors = require("cors");
const { connection } = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");

const corsOptions = {
  origin: "*", // Replace with your client's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/task", authMiddleware, taskRouter);

// default get route
app.get("/", (req, res) => {
  res.send("server working");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`server is running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1); // Optional: restart the server
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Optional: restart the server
});
