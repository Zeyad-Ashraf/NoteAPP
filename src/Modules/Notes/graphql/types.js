import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const NoteType = new GraphQLObjectType({
    name: "AddNoteResponse",
    fields: {
        message: { type: GraphQLString },
        feedBack: { type: GraphQLString }
    }
})

export const AllNotesType = new GraphQLObjectType({
    name: "AllNotesResponse",
    fields: {
        message: { type: GraphQLString },
        feedBack: { type: GraphQLString },
        data: { type: new GraphQLList(
            new GraphQLObjectType({
                name: "Note",
                fields: {
                    id: { type: GraphQLID },
                    title: { type: GraphQLString },
                    content: { type: GraphQLString },
                    ownerId: { type: GraphQLID },
                }
            })
        ) }
    }
})