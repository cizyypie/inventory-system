import httpStatus from 'http-status';
const { status } = httpStatus;  

import bcrypt from 'bcryptjs';
const { compare } = bcrypt;

import userService from './userService.js';
import ApiError from '../utils/ApiError.js';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, 'Incorrect email or password');
  }

  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    throw new ApiError(status.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

export default {
  loginUserWithEmailAndPassword,
};