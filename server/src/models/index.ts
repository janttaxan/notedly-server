import { Model } from 'mongoose';

import { Note, NoteType } from './note';
import { User, UserType } from './user';

export interface Models {
  Note: Model<NoteType>;
  User: Model<UserType>;
}

export const models: Models = {
  Note: Note,
  User: User,
};
