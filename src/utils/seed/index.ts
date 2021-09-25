import { config } from 'dotenv';

import { connectToDb } from '../db';
import { models } from '../../models/index';
import { seedNotes } from './notes';
import { seedUsers } from './users';

config();

const MONGO_URI = process.env.MONGO_URI || '';

const seed = async () => {
  console.log('Seeding data...');
  try {
    await connectToDb(MONGO_URI);

    const seedingUsers = await seedUsers();
    const users = await models.User.create(seedingUsers);

    const seedingNotes = await seedNotes(users);
    await models.Note.create(seedingNotes);

    console.log('Data successfully seeded');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};

seed().then();
