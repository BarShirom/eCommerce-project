import express, { Request, Response } from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import morgan from "morgan";
import path from "path";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import paypalRoutes from "./routes/paypalRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import connectDB from "./config/db";


const app = express();

app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT;

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("API IS RUNNING...");
});

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/config/paypal", paypalRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is active on port : ${PORT}`);
});
