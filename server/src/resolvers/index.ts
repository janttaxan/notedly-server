import { GraphQLDateTime } from 'graphql-iso-date';

import { query } from './query';
import { mutation } from './mutation';

export const resolvers = {
  Query: query,
  Mutation: mutation,
  DateTime: GraphQLDateTime,
};
