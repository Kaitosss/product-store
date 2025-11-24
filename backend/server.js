import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import productRouter from "./routes/product.routes.js";
import path from "path";

const PORT = process.env.PORT;
const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));

app.use("/product", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "dist", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
