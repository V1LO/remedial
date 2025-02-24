import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "./config/Database.js";
import AuthRoute from "./routes/AuthRoute.js";
import TaskRoute from "./routes/TaskRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", AuthRoute);
app.use("/tasks", TaskRoute);

db.sync().then(() => console.log("Database Connected"));

app.listen(5000, () => console.log("Server running on port 5000"));
