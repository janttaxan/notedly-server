import { AuthenticationError } from 'apollo-server-express';
import { config } from 'dotenv';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { url as gravatarUrl } from 'gravatar';

import { Mutation } from './types';

config();

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
