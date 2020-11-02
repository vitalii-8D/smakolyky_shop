import {NextFunction, Response} from 'express';
import {IRequestExtended, IUser} from '../../models';
import {ResponseStatusCodesEnum, UserStatusEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsUserConfirmedMiddleware =
  (req: IRequestExtended, res: Response, next: NextFunction): void | NextFunction => {
    const {status} = req.user as IUser;

    if (status !== UserStatusEnum.CONFIRMED) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.FORBIDDEN,
        customErrors.FORBIDDEN_USER_NOT_CONFIRMED.message,
        customErrors.FORBIDDEN_USER_NOT_CONFIRMED.code
      ));
    }

    next();
  };
