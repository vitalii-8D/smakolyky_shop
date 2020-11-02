import {NextFunction, Response} from 'express';
import {ResponseStatusCodesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {authService} from '../../services';
import {IRequestExtended, IUser} from '../../models';

export const checkIsUserLoggedInMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<any> => {
  const {_id} = req.user as IUser;

  const tokens = await authService.findTokensByParams({userId: _id});
  console.log(tokens);

  if (tokens) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_USER_ALREADY_LOGED_IN.message,
      customErrors.BAD_REQUEST_USER_ALREADY_LOGED_IN.code
    ));
  }

  next();
};
