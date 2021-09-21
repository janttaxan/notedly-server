import { ApolloServer } from 'apollo-server-express';
import { config } from 'dotenv';
import express from 'express';

import { connectToDb } from './utils/db';
import { Models, models } from './models';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { getUser, VerifiedUser } from './utils/get-user';

config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || '';

const app = express();

export interface ApolloContext {
  models: Models;
  user: VerifiedUser | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }): ApolloContext => {
    const token = req.headers.authorization || null;
    const user = getUser(token);
    // add values to apollo context
    return { models, user };
  },
});

async function start() {
  try {
    // connect to mongoDB
    await connectToDb(MONGO_URI);
    // run apollo server
    await server.start();
    server.applyMiddleware({ app, path: '/api' });
    // run express
    app.listen(PORT, () => {
      console.log(`GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    console.log('Server error:', String(err));
  }
}

start().then();
