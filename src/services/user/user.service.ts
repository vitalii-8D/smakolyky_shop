import {UserModel} from '../../database';
import {IUser} from '../../models';

class UserService {
  createUser(user: Partial<IUser>) {
    const userToCreate = new UserModel(user);

    return userToCreate.save();
  }

  findOneByParams(findObject: Partial<IUser>) {
    return UserModel.findOne(findObject);
  }
}

export const userService = new UserService();
