import * as TN from "./types.js";
import * as RN from "./resolve.js"
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";


export const NoteFields = {
    getAllNotes: {
        type: TN.AllNotesType,
        args: {
            authorization: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: RN.getAllNotes
    },
    addNote: {
        type: TN.NoteType,
        args: {
            title: { type: new GraphQLNonNull(GraphQLString) },
            content: { type: new GraphQLNonNull(GraphQLString) },
            ownerId: { type: new GraphQLNonNull(GraphQLID) },
            authorization: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: RN.addNote
    },
    deleteNote: {
        type: TN.NoteType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            authorization: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: RN.deleteNote
    }
}