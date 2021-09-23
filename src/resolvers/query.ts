import { Query } from './types';

export const query: Query = {
  notes: async (parent, args, context) => {
    return context.models.Note.find({}).limit(100);
  },
  note: async (parent, args, context) => {
    return context.models.Note.findById(args.noteId);
  },
  users: async (parent, args, context) => {
    return context.models.User.find({}).limit(100);
  },
  user: async (parent, args, context) => {
    return context.models.User.findOne({ username: args.username });
  },
  noteFeed: async (parent, args, context) => {
    // получаем ленту с пагинацией при помощи курсора
    const limit = args.limit ? args.limit : 10;
    let hasNextPage = false;
    type CursorQuery = {_id: {$lt: string}} | {}
    let cursorQuery: CursorQuery = {};

    if (args.cursor) {
      cursorQuery = { _id: { $lt: args.cursor } };
    }
    let notes = await context.models.Note.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);

    if (notes.length > limit) {
      hasNextPage = true;
      notes = notes.slice(0, -1);
    }

    const newCursor: CursorQuery = notes[notes.length - 1]._id;

    return {
      notes,
      cursor: newCursor,
      hasNextPage,
    };
  },
  me: async (parent, args, context) => {
    return context.models.User.findById(context.user?.id);
  },
};
