import {UserModel} from '../../database';
import {IUser, IUserToken} from '../../models';
import {Types} from 'mongoose';

class UserService {
  createUser(user: Partial<IUser>) {
    const userToCreate = new UserModel(user);
    /*console.log(' **--**--  userToCreate   ---***---***');
    console.log(userToCreate);
    console.log(' **--**--  userToCreate   ---***---***');*/

    return userToCreate.save();
  }

  addActionToken(id: string, tokenObject: IUserToken) {
    return UserModel.update(
      {_id: Types.ObjectId(id)},
      {
        $push: {
          tokens: tokenObject
        }
      }
    );
  }

  findOneByParams(findObject: Partial<IUser>) {
    return UserModel.findOne(findObject);
  }
}

export const userService = new UserService();
