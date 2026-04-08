import express from 'express';
import router from './routes/v1/index.js';
import config from './config/config.js';
import { successHandler, errorHandler as morganErrorHandler } from './config/morgan.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import ApiError from './utils/ApiError.js';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import { jwtStrategy } from './config/passport.js';
import passport from 'passport';
import status from 'http-status';

const app = express();

if (config.env !== 'test') {
  app.use(successHandler);
  app.use(morganErrorHandler);
}

// set security HTTP headers
app.use(helmet());

// aktifin parsing json
app.use(express.json());

// aktifin urlencoded
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.get('/', (req, res) => {
  res.send('hello world');
});
// v1 api routes
app.use('/v1', router);

// app.use(router);

// send 404 error jika route tidak ada
app.use((req, res, next) => {
  next(new ApiError(status.NOT_FOUND, 'Not found'));
});

// convert error jadi Instance API Error jika ada error yang tidak ketangkap
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
