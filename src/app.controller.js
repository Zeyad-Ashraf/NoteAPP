import { connectionDB } from "./DB/connectionDB.js";
import authRouter from "./Modules/Auth/auth.controller.js";
import notesRouter from "./Modules/Notes/notes.controller.js";
import { globalErrorHandler } from "./utils/index.js";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import expressPlayground from "graphql-playground-middleware-express";

export const appController = (app,express) => {

    const rateLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // Limit each IP to 100 requests per windowMs
    });

    app.use(express.json());
    app.use(helmet());

    app.use(cors({
        origin: "http://localhost:3000",
        methods: "GET,PATCH,POST,DELETE",
    }));

    app.use(rateLimiter);
    app.use(express.urlencoded({ extended: true }));
    connectionDB();

    app.get("/", (req, res) => {
        res.send("Welcome to the EventTask API");
    });

    app.use("/auth", authRouter);

    app.use("/graphql", notesRouter);
    app.get("/playground", expressPlayground.default({
        endpoint: "/graphql"
    }));

    // 404 Catch-All for all unmatched routes
    app.all(/^\/.*/, (req, res) => {
        res.status(404).json({ message: "Not Found" });
    });

    app.use(globalErrorHandler);
}