import { Schema, model } from 'mongoose';

export interface UserType {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

const schema = new Schema<UserType>({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
}, { timestamps: true });
// timestamps: присваивает поля createdAt и updatedAt к типу данных

export const User = model<UserType>('User', schema);
