import express from 'express';
import router from './routes/index.js';
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
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const app = express();

if (config.env !== 'test') {
  app.use(successHandler);
  app.use(morganErrorHandler);
}


app.set('view engine', 'ejs'); // Mengatur EJS sebagai template engine
app.set('views', path.join(__dirname, 'views')); // Mengatur direktori views
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.get('/', (req, res) => { res.render('index', {
    judul: 'Selamat Datang!',
    pesan: 'Ini adalah contoh template EJS.'
  });});
app.use('/', router);
app.use((req, res, next) => {
  next(new ApiError(status.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

export default app;
