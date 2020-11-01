import {AccessTokenModel} from '../../database';
import {IAccessToken} from '../../models';

class AuthService {
  createTokenPair(tokenObj: Partial<IAccessToken>): Promise<IAccessToken> {
    const tokenToCreate = new AccessTokenModel(tokenObj);

    return tokenToCreate.save();
  }

  findUserByToken(findObject: { accessToken?: string, refreshToken?: string }): Promise<IAccessToken | null> {
    return AccessTokenModel.findOne(findObject) as any;
  }

  removeToken(removeObject: Partial<IAccessToken>): Promise<any> {
    return AccessTokenModel.findOneAndDelete(removeObject) as any;
  }
}

export const authService = new AuthService();
