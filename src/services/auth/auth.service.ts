import {AccessTokenModel} from '../../database';
import {IAccessToken, IUser} from '../../models';

class AuthService {
  createTokenPair(tokenObj: Partial<IAccessToken>): Promise<IAccessToken> {
    /*console.log('---***---  tokenObj  ---***---');
    console.log(tokenObj);*/
    const tokenToCreate = new AccessTokenModel(tokenObj);

    return tokenToCreate.save();
  }

  findTokensByParams(findObj: Partial<IAccessToken>): Promise<IAccessToken | null> {
    return AccessTokenModel.findOne(findObj) as any;
  }

  async findUserByToken(findObject: { accessToken?: string, refreshToken?: string }): Promise<IUser | null> {
    const tokenAndUser = await AccessTokenModel
      .findOne(findObject)
      .populate('userId')
      .select({userId: 1, _id: 0}) as any;

    return tokenAndUser?.userId?.toJSON();
  }

  removeToken(removeObject: Partial<IAccessToken>): Promise<any> {
    return AccessTokenModel.findOneAndDelete(removeObject) as any;
  }
}

export const authService = new AuthService();
