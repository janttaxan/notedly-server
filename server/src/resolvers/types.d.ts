import { ApolloContext } from '../index';

type Resolver<ArgsType = {}> = (parent: any, args: ArgsType, context: ApolloContext) => Promise<unknown>;

export interface Query {
  notes: Resolver;
  note: Resolver<{id: string}>;
}

export interface Mutation {
  newNote: Resolver<{content: string}>;
}
