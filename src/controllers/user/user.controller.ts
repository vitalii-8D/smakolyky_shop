import {NextFunction, Request, Response} from 'express';
// import * as Joi from 'joi';

import {IUser} from '../../models';
import {userService} from '../../services/user';
import {newUserValidator} from '../../validators/user';
import {hashPassword} from '../../helpers';
import {emailService} from '../../services/mail';
import {ActionEnum} from '../../constants';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    // TO+DO validate user
    const {error} = await newUserValidator.validate(user);

    if (error) {
      return next(new Error(error.details[0].message));
    }
    // TO+DO hash password
    user.password = await hashPassword(user.password);

    await userService.createUser(user);

    await emailService.sendEmail(user.email, ActionEnum.USER_REGISTERED, {token: user.password});

    res.sendStatus(201);
  }
}

export const userController = new UserController();
