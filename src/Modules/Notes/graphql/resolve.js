import { notesModel } from "../../../DB/models/notes.model.js";
import { EnumRoles } from "../../../DB/models/users.model.js";
import { authGraphQL } from "../../../middlewares/auth.js";
import { graphValidation } from "../../../middlewares/validation.js";
import { create, findAll, findOneAndDelete } from "../../../utils/index.js";
import { addNoteValidation, deleteNoteValidation } from "../notes.validation.js";

export const addNote = async (parent, args) => {
    const { title, content, ownerId, authorization } = args;

    await graphValidation({schema: addNoteValidation, data: { title, content, ownerId, authorization }});
    await authGraphQL(authorization,[EnumRoles.admin, EnumRoles.user]);

    const newNote = await create(notesModel, { title, content, ownerId });

    return { message: "success", feedBack: "Note added successfully"};
}

export const deleteNote = async (parent, args) => {
    const { id, authorization } = args;

    await graphValidation({schema: deleteNoteValidation, data: { id, authorization }});
    const auth = await authGraphQL(authorization,[EnumRoles.admin, EnumRoles.user]);

    const deletedNote = await findOneAndDelete(notesModel, { _id: id, ownerId: auth._id });

    if (!deletedNote) {
        throw new Error("Note not found", { cause: 404 });
    }

    return { message: "success", feedBack: "Note deleted successfully" };
}

export const getAllNotes = async (parent, args) => {
    const { authorization } = args;

    const auth = await authGraphQL(authorization,[EnumRoles.admin, EnumRoles.user]);

    const notes = await findAll(notesModel, {ownerId: auth._id});

    if(notes.length === 0) {
        return { message: "success", feedBack: "No notes found", data: [] };
    }

    return { message: "success", feedBack: "All notes retrieved successfully", data: notes };
}
