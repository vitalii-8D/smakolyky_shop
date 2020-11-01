import {NextFunction, Request, Response} from 'express';
import {IRequestExtended, IUser} from '../../models';
import {comparePassword, tokenizer} from '../../helpers';
import {ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {authService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

class AuthController {
  async authUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<any> {
    try {
      const {_id, password} = req.user as IUser;
      const authInfo = req.body;

      const isPasswordEquels = await comparePassword(authInfo.password, password);
      if (!isPasswordEquels) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }

      const tokensPair = tokenizer(ActionEnum.USER_AUTH);

      const {accessToken, refreshToken} = await authService.createTokenPair({...tokensPair, userId: _id});

      res.json({accessToken, refreshToken});
    } catch (e) {
      return next(e);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const token = req.get(RequestHeadersEnum.AUTHORIZATION);

    await authService.removeToken({accessToken: token});

    res.sendStatus(ResponseStatusCodesEnum.NO_CONTENT);
  }
}

export const authController = new AuthController();
