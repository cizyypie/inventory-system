import status from 'http-status';
import bcrypt from 'bcryptjs';
import prisma from '../../prisma/client.js';
import ApiError from '../utils/ApiError.js';

const createUser = async (userBody) => {
  userBody.password = bcrypt.hashSync(userBody.password, 8);

  return prisma.user.create({
    data: userBody,
  });
};

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export default {
  createUser,
  getUserByEmail,
};
