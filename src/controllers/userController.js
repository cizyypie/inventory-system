import * as userService from '../services/userService.js';
import { createUserSchema, updateUserSchema } from '../validations/userValidation.js';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
const { status } = httpStatus;

export const createUser = catchAsync(async (req, res) => {
  const validatedData = createUserSchema.parse(req.body);

  const user = await userService.createUser(validatedData);
  res.status(status.CREATED).json({ data: user });
});

export const updateUser = catchAsync(async (req, res) => {
  const validatedData = updateUserSchema.parse(req.body);

  const user = await userService.updateUser(req.params.id, validatedData);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }
  res.status(status.OK).json({ data: user });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(status.OK).json({ data: users });
});

export const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }
  res.status(status.OK).json({ data: user });
});

export const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUser(req.params.id);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }
  res.status(status.OK).json({ message: 'User Deleted' });
});

export const getProductUser = catchAsync(async (req, res) => {
  const user = await userService.getProductUser(req.params.id);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }
  res.status(status.OK).json({ data: user });
});

export const getOrderUser = catchAsync(async (req, res) => {
  const user = await userService.getOrderUser(req.params.id);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User not found');
  }
  res.status(status.OK).json({ data: user });
});
