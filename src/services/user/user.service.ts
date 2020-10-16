import {UserModel} from '../../database';
import {IUser, IUserToken} from '../../models';
import {Types} from 'mongoose';

class UserService {
  createUser(user: Partial<IUser>) {
    const userToCreate = new UserModel(user);

    return userToCreate.save();
  }

  addActionToken(id: string, token: IUserToken) {
    return UserModel.aggregate([
      {
        $match: {
          _id: Types.ObjectId(id)
        }
      }
    ]);
  }

  findOneByParams(findObject: Partial<IUser>) {
    return UserModel.findOne(findObject);
  }
}

export const userService = new UserService();
