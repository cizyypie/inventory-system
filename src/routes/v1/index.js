import express from 'express';
import authRoute from './authRoute.js';
import categoryRoute from './categoryRoute.js';

const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/category', route: categoryRoute },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;