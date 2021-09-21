import { Mutation } from './types';

export const mutation: Mutation = {
  newNote: async (parent, args, context) => {
    const note = {
      content: args.content,
      author: 'Maxim Frolov',
    };
    return await context.models.Note.create(note);
  },
};
