import { ApolloContext } from '../index';

type Resolver<ArgsType = {}, ReturnType = unknown> =
  (parent: any, args: ArgsType, context: ApolloContext) => Promise<ReturnType>;

export interface Note {
  author: Resolver;
  favoritedBy: Resolver;
}

export interface User {
  notes: Resolver;
  favorites: Resolver;
}

export interface Query {
  notes: Resolver;
  note: Resolver<{noteId: string}>;
  users: Resolver;
  user: Resolver<{username: string}>;
  noteFeed: Resolver<{cursor?: string, limit?: number}>;
  me: Resolver;
}

export interface Mutation {
  newNote: Resolver<{noteContent: string}>;
  updateNote: Resolver<{noteId: string, noteContent: string}>;
  deleteNote: Resolver<{noteId: string}, boolean>;
  toggleFavorite: Resolver<{noteId: string}>;
  signUp: Resolver<{username: string, email: string, password: string}, string>;
  signIn: Resolver<{username?: string, email?: string, password: string}, string>;
}
