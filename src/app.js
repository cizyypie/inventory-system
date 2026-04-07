import express from "express";
import config from './config/config.js';
import { successHandler, errorHandler } from './config/morgan.js';
import userRoute from "./routes/userRoute.js";

const app = express();

if (config.env !== 'test') {
  app.use(successHandler);
  app.use(errorHandler);
}

// aktifin parsing json
app.use(express.json());

// aktifin urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello world');
});
app.use("/users", userRoute);

export default app;