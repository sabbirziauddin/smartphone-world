import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { productRouter } from "./app/modules/product/product.route";

// express
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", productRouter);


// Custom 404 Error Handling Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;
