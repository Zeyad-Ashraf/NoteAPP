import express from "express";
import dotenv from "dotenv";
import path from "path";
import { appController } from "./src/app.controller.js";

dotenv.config({path: path.resolve("./config/.env")});

const app = express();

const PORT = process.env.PORT || 5000;

appController(app, express);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));