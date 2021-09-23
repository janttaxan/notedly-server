"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const graphql_iso_date_1 = require("graphql-iso-date");
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const note_1 = require("./note");
const user_1 = require("./user");
exports.resolvers = {
    Query: query_1.query,
    Mutation: mutation_1.mutation,
    Note: note_1.note,
    User: user_1.user,
    DateTime: graphql_iso_date_1.GraphQLDateTime,
};
