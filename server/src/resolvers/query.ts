import { Query } from './types';

export const query: Query = {
  notes: async (parent, args, context) => {
    return context.models.Note.find({});
  },
  note: async (parent, args, context) => {
    return context.models.Note.findById(args.id);
  },
};
