import { Router } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "../graphSchema.js";
import openAiRouter from "../OpenAi/openai.controller.js";

const notesRouter = Router({strict: true, mergeParams: true});

notesRouter.use("/notes/:id/summary", openAiRouter);
notesRouter.use("/notes", createHandler({schema}));

export default notesRouter;
