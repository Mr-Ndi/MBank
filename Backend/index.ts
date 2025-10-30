import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"
import documentRouter from "./src/Document/Route/Document.route.js";
import { swaggerSpec, swaggerUi } from "./src/config/swagger.config.js";
import Authrouter from "./src/Auth/Route/Auth.route.js";
// import AdminRouter from "./Kibamba/Route/Kibamba.router.js"
// import studentRouter from "./src/Student/Route/Student.Route.js";

dotenv.config();
const app = express();

app.use(cors());
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`---------------------------------`);
    console.log(`Server listening on port ${PORT}`);
    console.log(`---------------------------------`);
});
