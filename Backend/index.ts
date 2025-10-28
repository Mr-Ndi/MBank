import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"
import studentRouter from "./Student/Route/Student.Route.js";
import documentRouter from "./Document/Route/Document.route.js";
// import AdminRouter from "./Kibamba/Route/Kibamba.router.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello! Your Marks Bank backend is running.");
});
app.use("/student", studentRouter);
app.use("/document", documentRouter);
// app.use("/admin", AdminRouter)

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`---------------------------------`);
    console.log(`Server listening on port ${PORT}`);
    console.log(`---------------------------------`);
});
