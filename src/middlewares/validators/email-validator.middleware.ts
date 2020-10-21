import {NextFunction, Request, Response} from 'express';
import {emailValidator} from '../../validators';
import {ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';

export {emailValidator} from '../../validators';

export const emailValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {email} = req.body;

  /*console.log('emailValidatorMiddleware -----****---**-*-*');
  console.log(req.body);*/

  const {error} = emailValidator.validate({email});

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
