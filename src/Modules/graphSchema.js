import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { NoteFields } from "./Notes/graphql/fields.js";
import { deleteNote } from "./Notes/graphql/resolve.js";

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "GetNotes",
        fields: {
            getAllNotes: NoteFields.getAllNotes,
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            addNote: NoteFields.addNote,
            deleteNote: NoteFields.deleteNote,
        }
    })
})

export default schema;