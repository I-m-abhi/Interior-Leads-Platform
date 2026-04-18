import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import job from './config/cron.js';
import errorHandleMiddleware from "./middleware/error.js";
import userRoutes from "./routes/user.route.js";
import leadRoutes from "./routes/lead.route.js";

job.start();
dotenv.config({ path: "./src/config/config.env" });

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://interior-leads-platform-8vg7.vercel.app"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res)=> {
  res.send("Welcome to the CRM API");
})
app.use("/api/auth", userRoutes);
app.use("/api", leadRoutes);

//Error Handling Middleware
app.use(errorHandleMiddleware);

export default app;