import { GraphQLDateTime } from 'graphql-iso-date';

import { query } from './query';
import { mutation } from './mutation';
import { note } from './note';
import { user } from './user';

export const resolvers = {
  Query: query,
  Mutation: mutation,
  Note: note,
  User: user,
  DateTime: GraphQLDateTime,
};
