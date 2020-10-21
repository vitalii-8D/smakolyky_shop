import {NextFunction, Response} from 'express';
import {ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {userService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {IRequestExtended} from '../../models';

export const checkForgotPasswordMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const token = req.get(RequestHeadersEnum.AUTHORIZATION);

  if (!token) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
  }

  const userByToken = await userService.findUserByActionToken(ActionEnum.FORGOT_PASSWORD, token);

  if (!userByToken) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
  }

  req.user = userByToken;
  next();
}
