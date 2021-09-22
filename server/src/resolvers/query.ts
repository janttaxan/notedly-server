import { Query } from './types';

export const query: Query = {
  notes: async (parent, args, context) => {
    return context.models.Note.find({});
  },
  note: async (parent, args, context) => {
    return context.models.Note.findById(args.noteId);
  },
  users: async (parent, args, context) => {
    return context.models.User.find({});
  },
  user: async (parent, args, context) => {
    return context.models.User.findOne({ username: args.username });
  },
  me: async (parent, args, context) => {
    return context.models.User.findById(context.user?.id);
  },
};
