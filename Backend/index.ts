import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRouter from "./Student/Route/Student.Route";
import documentRouter from "./Document/Route/Document.route";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/student", studentRouter);
app.use("/document", documentRouter);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`---------------------------------`);
    console.log(`Server listening on port ${PORT}`);
    console.log(`---------------------------------`);
});
