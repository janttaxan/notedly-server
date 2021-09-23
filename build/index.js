"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = require("./utils/db");
const models_1 = require("./models");
const resolvers_1 = require("./resolvers");
const schema_1 = require("./schema");
const get_user_1 = require("./utils/get-user");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || '';
const URL = process.env.NODE_ENV === 'production'
    ? 'domen'
    : `http://localhost:${PORT}`;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    validationRules: [(0, graphql_depth_limit_1.default)(5)],
    context: ({ req }) => {
        const token = req.headers.authorization || null;
        const user = (0, get_user_1.getUser)(token);
        // add values to apollo context
        return { models: models_1.models, user };
    },
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // connect to mongoDB
            yield (0, db_1.connectToDb)(MONGO_URI);
            // run apollo server
            yield server.start();
            server.applyMiddleware({ app, path: '/api' });
            // run express
            app.listen(PORT, () => {
                console.log(`GraphQL Server running at ${URL}${server.graphqlPath}`);
            });
        }
        catch (err) {
            console.log('Server error:', String(err));
        }
    });
}
start().then();
