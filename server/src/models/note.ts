import { Schema, model } from 'mongoose';
import { User } from './user';

export interface NoteType {
  content: string;
  author: string;
  favoriteCount: number;
  favoritedBy: Array<string>
}

const schema = new Schema<NoteType>({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    ref: User,
    required: true,
  },
  favoriteCount: {
    type: Number,
    default: 0,
  },
  favoritedBy: [
    {
      type: String,
      ref: User,
    },
  ],
}, { timestamps: true });

export const Note = model<NoteType>('Note', schema);
