import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello apollo server',
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
  try {
    await server.start();
    server.applyMiddleware({ app, path: '/api' });
    app.get('/', (req, res) => {
      res.send('hello express + TypeScript');
    });

    app.listen(PORT, () => {
      console.log(`GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    console.log('Server error:', String(err));
  }
}

start();
