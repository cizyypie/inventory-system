import catchAsync from '../utils/catchAsync.js';
import authService from '../services/authService.js';
import userService from '../services/userService.js';
import tokenService from '../services/tokenService.js';
import ApiError from '../utils/ApiError.js';
import status from 'http-status';

const register = catchAsync(async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(status.BAD_REQUEST, 'Email already taken');
  }

  const userCreated = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(userCreated);
  res.status(status.CREATED).send({ userCreated, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  res.status(status.OK).send({
    status: status.OK,
    message: 'Logout Success',
    data: null,
  });
});

export  {
  register,
  login,
  logout,
};
