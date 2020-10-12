import * as cors from 'cors';
import * as express from 'express';

import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as path from 'path';
import {NextFunction} from 'express';

dotenv.config({});

// Обмеження на кількість запитів за одиницю часу
const serverRequestLimit = rateLimit({
  windowMs: 10000,
  max: 100 // TODO ad this to .dotenv
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
      this.app.use(cors({}));

      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: true}));

      this.app.use(express.static(path.join((global as any), 'public')));

      // TODO router

      this.app.use(this.customErrorHandler);
    }

    private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
      res
        .status(err.status || 500)
        .json({
          message: err.message || 'Error unknown',
          code: err.code
        });
    }
}

export const app = new App().app;
