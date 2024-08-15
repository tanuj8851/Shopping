//modules import
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connection from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

// configure dotenv
dotenv.config();

//rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// dotenv files
const port = process.env.port || 8080;

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//Home Route
app.get("/", (req, res) => {
  res.send("<h1>Welcome To E-commerce Application Backend.</h1>");
});

// app Listen
app.listen(port, async () => {
  console.log(`App is running on port ${port}`.bgBlue);

  try {
    await connection;
    console.log(`DB Connected`.bgMagenta.white);
  } catch (error) {
    console.log({ success: false, error: error.message });
  }
});
