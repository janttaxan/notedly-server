import { User } from './types';

export const user: User = {
  notes: async (parent, args, context) => {
    return context.models.Note.find({ authorId: parent._id }).sort({ _id: -1 });
  },
  favorites: async (parent, args, context) => {
    return context.models.Note.find({ favoritedBy: parent._id }).sort({ _id: -1 });
  },
};
