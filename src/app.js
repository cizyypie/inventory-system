import express from 'express';
import { status } from 'http-status';
import config from './config/config.js';
import { successHandler, errorHandler as morganErrorHandler } from './config/morgan.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import ApiError from './utils/ApiError.js';
import helmet from 'helmet';
import xss from 'xss'
import compression from 'compression';
import cors from 'cross'

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

app.get('/', (req, res) => {
  res.send('hello world');
});

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