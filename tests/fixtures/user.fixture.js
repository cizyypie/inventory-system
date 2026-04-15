import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker'; 
import prisma from '../../prisma/index.js'; 
import { v4 } from 'uuid';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

export const userOne = {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

export const userTwo = {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

export const admin = {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
};

export const insertUsers = async (users) => {
  const usersWithHashedPassword = users.map((user) => ({ ...user, password: hashedPassword }));
  await prisma.user.createMany({
    data: usersWithHashedPassword,
    skipDuplicates: true,
  });
};
