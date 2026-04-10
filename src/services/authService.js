import status from 'http-status';
import bcrypt from 'bcryptjs';
import prisma from '../../prisma/client.js';
import ApiError from '../utils/ApiError.js';

const register = async (userBody) => {
  const existing = await prisma.user.findUnique({ where: { email: userBody.email } });
  if (existing) {
    throw new ApiError(status.BAD_REQUEST, 'Email already taken');
  }

  userBody.password = bcrypt.hashSync(userBody.password, 8);
  return prisma.user.create({ data: userBody });
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, 'Incorrect email or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new ApiError(status.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

const logout = async () => {
  return true;
};

export { register, login, logout };