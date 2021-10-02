import { User } from './types';

export const user: User = {
  notes: async (parent, args, context) => {
    return context.models.Note.find({ author: parent.id }).sort({ id: -1 });
  },
  favorites: async (parent, args, context) => {
    return context.models.Note.find({ favoritedBy: parent.id }).sort({ id: -1 });
  },
};
