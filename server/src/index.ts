import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { notes } from './stubs/notes';

const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello apollo server',
    notes: () => notes,
    note: (_: any, args: {id: string}) => notes.find((note) => note.id === args.id),
  },
  Mutation: {
    newNote: (parent: any, args: {content: string}) => {
      const note = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Maxim Frolov',
      };
      notes.push(note);
      return note;
    },
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

start().then();
