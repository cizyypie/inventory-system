import express from 'express';
import auth from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { orderItemValidation } from '../validations/index.js';
import * as orderItemController from '../controllers/orderItemController.js';

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(orderItemValidation.createOrderItem), orderItemController.createOrderItem)
  .get(auth(), orderItemController.getOrderItems);

router
  .route('/:orderItemId')
  .get(auth(), validate(orderItemValidation.getOrderItem), orderItemController.getOrderItem)
  .put(auth(), validate(orderItemValidation.updateOrderItem), orderItemController.updateOrderItem)
  .delete(auth(), validate(orderItemValidation.deleteOrderItem), orderItemController.deleteOrderItem);

export default router;