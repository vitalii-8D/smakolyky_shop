import {NextFunction, Request, Response} from 'express';

import * as cors from 'cors';
import * as express from 'express';

import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import {config} from './config';
import {adminRouter, authRouter, productRouter, userRouter} from './routes';

dotenv.config({});

// Обмеження на кількість запитів за одиницю часу
const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests // TO+DO ad this to .dotenv
});

class App {
  public readonly app: express.Application = express();

  constructor() {
    (global as any).appRoot = path.resolve(process.cwd(), '../');
    // Logger
    this.app.use(morgan('dev'));
    // Захист
    this.app.use(helmet());
    this.app.use(serverRequestLimit);
    this.app.use(cors({
      origin: this.configureCors
    }));

    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    this.app.use(express.static(path.join((global as any).appRoot, 'public')));

    // TO+DO router
    this.mountRoutes();
    this.setupDB();

    this.app.use(this.customErrorHandler);
  }

  // Підключення бази
  private setupDB(): void {
    mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true});

    const db = mongoose.connection;
    db.on('error', console.log.bind(console, 'MONGO ERROR'));
  }

  // Відловлювання помилок
  private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    res
      .status(err.status || 500)
      .json({
        message: err.message || 'Unknown Error',
        code: err.code
      });
  }

  // Налаштовуємо Cors щоб можна було ходити тільки з певних урл
  private configureCors = (origin: any, callback: any) => {
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (!origin) {// For Postman
      return callback(null, true);
    }
    if (!whiteList.includes(origin)) {
      return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
  }

  // Власне роути
  private mountRoutes(): void {
    this.app.use('/admin', adminRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/products', productRouter);
    this.app.use('/users', userRouter);
  }

}

export const app = new App().app;
