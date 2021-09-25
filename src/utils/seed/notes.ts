// Generate 25 fake notes

import * as faker from 'faker';
import fetch from 'node-fetch';

import { NoteType } from '../../models/note';
import { UserType } from '../../models/user';

export const seedNotes = async (users: Array<UserType>) => {
  console.log('Seeding notes...');
  let notes = [];

  for (let i = 0; i < 25; i++) {
    let random = Math.floor(Math.random() * users.length);
    let content;

    // grab content from the lorem markdown api
    const response = await fetch('https://jaspervdj.be/lorem-markdownum/markdown.txt');

    if (response.ok) {
      content = await response.text();
    } else {
      content = faker.lorem.paragraph();
    }

    let note: NoteType = {
      content,
      favoriteCount: 0,
      favoritedBy: [],
      // @ts-ignore
      author: users[random]._id,
    };
    notes.push(note);
  }

  console.log('Notes successfully seeded');
  return notes;
};
