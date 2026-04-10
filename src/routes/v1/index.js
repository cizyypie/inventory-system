import express from 'express';
import authRoute from './authRoute.js';
import categoryRoute from './categoryRoute.js';
// import productRoute from './productRoute.js';
import userRoute from '../userRoute.js';

const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/categories', route: categoryRoute },
  // { path: '/products', route: productRoute },
  { path: '/users', route: userRoute },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;