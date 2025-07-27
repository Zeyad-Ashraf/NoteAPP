import { Router } from "express";
import { authentication } from "../../middlewares/auth.js";
import * as OpenaiServices from "./openai.service.js";
const openAiRouter = Router({strict: true, mergeParams: true});


openAiRouter.post('/', authentication, OpenaiServices.startChat)



export default openAiRouter;