import express from 'express';
import auth from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import * as validations from '../validations/index.js';
import * as userController from '../controllers/userController.js';
import * as productController from '../controllers/productController.js';
import * as orderController from '../controllers/orderController.js';


const router = express.Router();

router.route('/')
  .get(auth(), userController.getAllUsers)
  .post(auth(), userController.createUser);

router.route('/:userId')
  .get(auth(), userController.getUserById)
  .put(auth(), userController.updateUser)
  .delete(auth(), userController.deleteUser);

  router.get(
  '/:userId/products',
  auth(),
  validate(validations.productValidation.getProductsByUser),
  productController.getProductsByUser
);

router.get(
  '/:userId/orders',
  auth(),
  validate(validations.orderValidation.getOrdersByUser),
  orderController.getOrdersByUser
);

export default router;