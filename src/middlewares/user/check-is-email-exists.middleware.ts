import {NextFunction, Request, Response} from 'express';
import {userService} from '../../services/user';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsEmailExist = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  const {email} = req.body;

  const userByEmail = await userService.findOneByParams({email});

  if (userByEmail) {
    return next(new ErrorHandler(400,
      customErrors.BAD_REQUEST_USER_REGISTERED.message,
      customErrors.BAD_REQUEST_USER_REGISTERED.code
    ));
  }

  next();
};
