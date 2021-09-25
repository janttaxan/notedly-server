// Generate 10 fake users

import * as faker from 'faker';
import { hash } from 'bcrypt';
import { url as gravatarUrl } from 'gravatar';

import { UserType } from '../../models/user';

export const seedUsers = async () => {
  console.log('Seeding users...');
  let users = [];

  for (let i = 0; i < 10; i++) {
    let user: UserType = {
      username: faker.internet.userName(),
      password: await hash('password', 10),
      email: faker.internet.email(),
    };
    user.avatar = gravatarUrl(user.email);
    users.push(user);
  }

  console.log('Users successfully seeded');
  return users;
};
