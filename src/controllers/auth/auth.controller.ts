import {NextFunction, Response} from 'express';
import {IRequestExtended, IUser} from '../../models';
import {comparePassword, tokenizer} from '../../helpers';
import {ActionEnum, LogsEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {authService, logService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

class AuthController {
  async authUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<any> {
    try {
      const {_id, password, email, name, surname} = req.user as IUser;
      const authInfo = req.body;

      const isPasswordEquels = await comparePassword(authInfo.password, password);
      if (!isPasswordEquels) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }
      const {access_token, refresh_token} = tokenizer(ActionEnum.USER_AUTH);

      const {accessToken, refreshToken} = await authService.createTokenPair({
        accessToken: access_token,
        refreshToken: refresh_token,
        userId: _id
      });

      await logService.createLog({userId: _id, event: LogsEnum.USER_LOGIN, data: JSON.stringify({name, surname, email})});

      res.json({accessToken, refreshToken});
    } catch (e) {
      return next(e);
    }
  }

  async logoutUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<any> {
    const token = req.get(RequestHeadersEnum.AUTHORIZATION);
    const {_id, name, surname, email} = req.user as IUser;

    await authService.removeToken({accessToken: token});

    await logService.createLog({userId: _id, event: LogsEnum.USER_LOGOUT, data: JSON.stringify({name, surname, email})});

    res./*json('Logged out').*/sendStatus(ResponseStatusCodesEnum.NO_CONTENT);
  }
}

export const authController = new AuthController();
