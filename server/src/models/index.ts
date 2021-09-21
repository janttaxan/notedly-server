import { Note } from './note';
import { Model } from 'mongoose';

type ModelType = Model<unknown, {}, {}, {}>;

export interface Models {
  Note: ModelType;
}

export const models: Models = {
  Note: Note,
};
