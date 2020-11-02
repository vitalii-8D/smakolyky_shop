import {NextFunction, Request, Response} from 'express';
import {newProductValidator} from '../../validators';
import {ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';

export {emailValidator} from '../../validators';

export const newProductValidatorMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  const product = req.body;

  /*console.log('singlePasswordValidatorMiddleware -----****---**-*-*');
  console.log(req.body);*/

  const {error} = await newProductValidator.validate(product);
  console.log(error);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
