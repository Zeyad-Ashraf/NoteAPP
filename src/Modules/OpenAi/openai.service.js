import { notesModel } from "../../DB/models/notes.model.js";
import { EnumRoles } from "../../DB/models/users.model.js";
import { asyncHandler, findOneByID, /*openai*/ openRouter } from "../../utils/index.js";
import axios from "axios";

export const startChat = asyncHandler(async (req,res,next) =>{
  const { id } = req.params;

  if (!req.user)
    return next(new Error("Unauthorized or don't have permission you should subscribe", { cause: 401 }));

  if(!id) return next(new Error("id is required", { cause: 400 }));

  const noteFromDB = await findOneByID(notesModel, id);
  if(!noteFromDB) return next(new Error("Note not found", { cause: 404 }));
  const messages = [
      {
          role: EnumRoles.system,
          content: `You are a helpful assistant that summarizes text clearly and concisely.`,
      },
      {
          role: EnumRoles.user,
          content: `Summarize the following note: ${noteFromDB.content}`,
      }
  ];
  try {
      // Integration with openAi Paid
      // const completion = await openai.chat.completions.create({
      //     model: "gpt-3.5-turbo",
      //     messages,
      // });

      // Integration with OpenRouter free
      const completion = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
              model: "mistralai/mistral-7b-instruct",
              messages,
          },
          {
            headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            },
          }
      );
      const response = completion.data.choices[0].message.content;

      return res.status(200).json({ message: "success", summary: response });
  } catch (err) {
      return res.status(500).json({
          error: err?.response?.data ?? 'Something went wrong',
      });
  }
})