import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { config } from 'dotenv';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { url as gravatarUrl } from 'gravatar';

import { Mutation } from './types';

config();

export const mutation: Mutation = {
  newNote: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError('You must be signed in to create a note');
    }

    const note = {
      content: args.noteContent,
      author: context.user.id,
    };
    return await context.models.Note.create(note);
  },
  updateNote: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError('You must be signed in to update a note');
    }
    const note = await context.models.Note.findById(args.noteId);
    if (!note) {
      throw new Error('Note not find');
    }
    if (note.author !== context.user.id) {
      throw new ForbiddenError('You don`t have permissions to update the note');
    }
    return context.models.Note.findByIdAndUpdate(
      args.noteId,
      { $set: { content: args.noteContent } },
      { new: true },
    );
  },
  deleteNote: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError('You must be signed in to delete a note');
    }
    const note = await context.models.Note.findById(args.noteId);
    if (note && note.author !== context.user.id) {
      throw new ForbiddenError('You don`t have permissions to delete the note');
    }
    try {
      if (note) {
        await note.remove();
      }
      return true;
    } catch (err) {
      return false;
    }
  },
  toggleFavorite: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError('You must be signed in to add to favorites');
    }
    const noteCheck = await context.models.Note.findById(args.noteId);
    if (!noteCheck) {
      throw new Error('Note not find');
    }
    const hasUser = noteCheck.favoritedBy.indexOf(context.user.id);

    if (hasUser >= 0) {
      return context.models.Note.findByIdAndUpdate(
        args.noteId,
        {
          $pull: {
            favoritedBy: context.user.id,
          },
          $inc: {
            favoriteCount: -1,
          },
        },
        { new: true },
      );
    } else {
      return context.models.Note.findByIdAndUpdate(
        args.noteId,
        {
          $push: {
            favoritedBy: context.user.id,
          },
          $inc: {
            favoriteCount: 1,
          },
        },
        { new: true },
      );
    }
  },
  signUp: async (parent, args, context) => {
    // normalize email
    const email = args.email.trim().toLowerCase();
    // hashed password
    const hashed = await hash(args.password, 10);
    // get url for avatar
    const avatar = gravatarUrl(email);

    try {
      const user = await context.models.User.create({
        username: args.username,
        email,
        password: hashed,
        avatar,
      });

      // create and return json web token
      return sign({ id: user._id }, process.env.JWT_SECRET || '');
    } catch (err) {
      console.log(err);
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, args, context) => {
    // try find user by username or email
    const user = await context.models.User.findOne({
      $or: [{ email: args.email?.trim().toLowerCase() }, { username: args.username }],
    });
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }
    // password verification
    const valid = await compare(args.password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }
    // create and return json web token
    return sign({ id: user._id }, process.env.JWT_SECRET || '');
  },
};
