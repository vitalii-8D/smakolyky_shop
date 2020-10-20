import {UserModel} from '../../database';
import {IUser, IUserToken} from '../../models';
import {Types} from 'mongoose';
import {ActionEnum} from '../../constants';

class UserService {
  createUser(user: Partial<IUser>): Promise<IUser> {
    const userToCreate = new UserModel(user);
    /*console.log(' **--**--  userToCreate   ---***---***');
    console.log(userToCreate);
    console.log(' **--**--  userToCreate   ---***---***');*/

    return userToCreate.save();
  }

  addActionToken(id: string, tokenObject: IUserToken): Promise<IUser> {
    return UserModel.update(
      {_id: Types.ObjectId(id)},
      {
        $push: {
          tokens: tokenObject
        }
      }
    ) as any;
  }

  updateUserByParams(params: Partial<IUser>, toUpdate: Partial<IUser>): Promise<IUser> {
    return UserModel.updateOne(params, toUpdate, {new: true}) as any;
  }

  findOneByParams(findObject: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findOne(findObject) as any;
  }

  findUserByActionToken(action: ActionEnum, token: string): Promise<IUser | null> {
    return UserModel.findOne({
      $and: [
        {'tokens.action': action},
        {'tokens.token': token}
      ] as any
    }) as any;
  }

  removeActionToken(action: ActionEnum, token: string): Promise<IUser | null> {
    return UserModel.update(
      {},
      {$pull: {tokens: {action, token}}},
      {multi: true}
    ) as any;
  }

}

export const userService = new UserService();
