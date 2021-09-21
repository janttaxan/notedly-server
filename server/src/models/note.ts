import { Schema, model } from 'mongoose';

const schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
}, { timestamps: true });
// timestamps: присваивает поля createdAt и updatedAt к типу данных

export const Note = model('Note', schema);
