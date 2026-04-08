import httpStatus from 'http-status';
const { status } = httpStatus;

import bcrypt from 'bcryptjs';
const { hashSync } = bcrypt;

import prisma from '../../prisma/client.js';
import ApiError from '../utils/ApiError.js';

const createUser = async (userBody) => {
  userBody.password = hashSync(userBody.password, 8);

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