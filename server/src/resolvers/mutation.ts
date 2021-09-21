import { Mutation } from './types';

export const mutation: Mutation = {
  newNote: async (parent, args, context) => {
    const note = {
      content: args.content,
      author: 'Maxim Frolov',
    };
    return await context.models.Note.create(note);
  },
  updateNote: async (parent, args, context) => {
    return context.models.Note.findByIdAndUpdate(
      { _id: args.id },
      { $set: { content: args.content } },
      { new: true },
    );
  },
  deleteNote: async (parent, args, context) => {
    try {
      await context.models.Note.findOneAndRemove({ _id: args.id });
      return true;
    } catch (err) {
      return false;
    }
  },
};
