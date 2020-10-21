import {NextFunction, Request, Response} from 'express';
import {passwordValidator} from '../../validators';
import {ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';

export {emailValidator} from '../../validators';

export const singlePasswordValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {password} = req.body;

  /*console.log('singlePasswordValidatorMiddleware -----****---**-*-*');
  console.log(req.body);*/

  const {error} = passwordValidator.validate({password});

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
