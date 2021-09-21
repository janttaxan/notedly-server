import { Schema, model } from 'mongoose';

export interface NoteType {
  content: string;
  author: string;
}

const schema = new Schema<NoteType>({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Note = model<NoteType>('Note', schema);
