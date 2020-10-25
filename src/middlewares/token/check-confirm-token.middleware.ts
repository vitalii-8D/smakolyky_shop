import {NextFunction, Response} from 'express';
import {ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {userService} from '../../services';
import {IRequestExtended} from '../../models';
import {tokenVerificator} from '../../helpers';

export const checkConfirmTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<any> => {
  const token = req.get(RequestHeadersEnum.AUTHORIZATION);

  if (!token) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
  }

  try {
    // console.log('---***---   Starting confirmation   ---***---');
    const verifyResult = await tokenVerificator(ActionEnum.USER_REGISTER, token);
    console.log('---***---   verifyConfirmResult   ---***---');
    console.log(verifyResult);
  } catch (e) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, e.message));
  }

  const userByToken = await userService.findUserByActionToken(ActionEnum.USER_REGISTER, token);

  if (!userByToken) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
  }

  req.user = userByToken;
  next();
};
