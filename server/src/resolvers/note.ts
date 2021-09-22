import { Note } from './types';

export const note: Note = {
  author: async (parent, args, context) => {
    return context.models.User.findById(parent.author);
  },
  favoritedBy: async (parent, args, context) => {
    return context.models.User.find({ _id: { $in: parent.favoritedBy } });
  },
};
