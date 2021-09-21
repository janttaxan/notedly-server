import { ApolloServer } from 'apollo-server-express';
import { config } from 'dotenv';
import express from 'express';

import { connectToDb } from './utils/db';
import { Models, models } from './models';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

export interface ApolloContext {
  models: Models;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): ApolloContext => {
    // add DB models to apollo context
    return { models };
  },
});

async function start() {
  try {
    // connect to mongoDB
    if (MONGO_URI) {
      await connectToDb(MONGO_URI);
    }
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
