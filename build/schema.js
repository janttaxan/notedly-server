"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note]
    favorites: [Note]!
  }

  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    noteFeed(cursor: String, limit: Int): NoteFeed
    notes: [Note]!
    note(noteId: ID!): Note!
    users: [User!]!
    user(username: String!): User
    me: User!
  }

  type Mutation {
    newNote(noteContent: String!): Note!
    updateNote(noteId: ID!, noteContent: String!): Note!
    deleteNote(noteId: ID!): Boolean!
    toggleFavorite(noteId: ID!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;
