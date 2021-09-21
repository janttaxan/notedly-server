import { ApolloContext } from '../index';

type Resolver<ArgsType = {}, ReturnType = unknown> =
  (parent: any, args: ArgsType, context: ApolloContext) => Promise<ReturnType>;

export interface Query {
  notes: Resolver;
  note: Resolver<{id: string}>;
}

export interface Mutation {
  newNote: Resolver<{content: string}>;
  updateNote: Resolver<{id: string, content: string}>;
  deleteNote: Resolver<{id: string}, boolean>;
}
