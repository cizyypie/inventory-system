import express from 'express';
import auth from '../middlewares/auth.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.route('/')
  .get(auth(), userController.getAllUsers)
  .post(auth(), userController.createUser);

router.route('/:userId')
  .get(auth(), userController.getUserById)
  .put(auth(), userController.updateUser)
  .delete(auth(), userController.deleteUser);

export default router;