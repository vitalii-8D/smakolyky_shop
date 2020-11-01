import {NextFunction, Response} from 'express';
import {ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {userService} from '../../services';
import {IRequestExtended} from '../../models';
import {tokenVerificator} from '../../helpers';

export const checkAccessTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<any> => {
  const token = req.get(RequestHeadersEnum.AUTHORIZATION);

  if (!token) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
  }

  try {
    // console.log('---***---   Starting confirmation   ---***---');
    const verifyResult = await tokenVerificator(ActionEnum.USER_AUTH, token);
    console.log('---***---   checkAccessTokenMiddleware   ---***---');
    console.log(verifyResult);
  } catch (e) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, e.message));
  }

  const userByToken = await userService.findUserByActionToken(ActionEnum.USER_AUTH, token);

  if (!userByToken) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
  }

  req.user = userByToken;
  next();
};
