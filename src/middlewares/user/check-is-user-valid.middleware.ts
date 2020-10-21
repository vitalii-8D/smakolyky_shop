import {NextFunction, Request, Response} from 'express';
import {ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';
import {newUserValidator} from '../../validators/user';

export const checkIsUserValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  console.log('checkIsUserValidMiddleware -----****---**-*-*');
  console.log(req.body);

  const {error} = newUserValidator.validate(user);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
