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

const allowedOrigins = [
  "https://admin.decowallstudio.com",
  "https://decowallstudio.com",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true,
}));

app.options("*", cors());

// app.use(cors({
//   origin: [
//     "https://admin.decowallstudio.com",
//     "https://decowallstudio.com"
//   ],
//   credentials: true,
// }));

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Welcome to the CRM API");
})
app.use("/api/auth", userRoutes);
app.use("/api", leadRoutes);

//Error Handling Middleware
app.use(errorHandleMiddleware);

export default app;