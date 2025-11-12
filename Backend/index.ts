import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"
import documentRouter from "./src/Document/Route/Document.route.js";
import { swaggerSpec, swaggerUi } from "./src/config/swagger.config.js";
import Authrouter from "./src/Auth/Route/Auth.route.js";
import { errorHandler } from "./src/utils/error.js";
// import AdminRouter from "./Kibamba/Route/Kibamba.router.js"
// import studentRouter from "./src/Student/Route/Student.Route.js";

dotenv.config();
const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : ["*"];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello! Your Marks Bank backend is running.");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/document", documentRouter);
app.use("/auth", Authrouter);
// app.use("/admin", AdminRouter)
// app.use("/student", studentRouter);

// Universal error handler (must be after all routes/middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`---------------------------------`);
    console.log(`Server listening on port ${PORT}`);
    console.log(`---------------------------------`);
});
