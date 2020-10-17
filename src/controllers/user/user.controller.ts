import {NextFunction, Request, Response} from 'express';
import {IUser} from '../../models';
import {userService} from '../../services/user';
import {newUserValidator} from '../../validators/user';
import {hashPassword, tokenizer} from '../../helpers';
import {emailService} from '../../services/mail';
import {ActionEnum} from '../../constants';

// import * as Joi from 'joi';

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

    const {_id} = await userService.createUser(user);

    const {access_token} = tokenizer(ActionEnum.USER_REGISTER);

    // TO+DO token in database
    await userService.addActionToken(_id, {token: access_token, action: ActionEnum.USER_REGISTER});

    await emailService.sendEmail(user.email, ActionEnum.USER_REGISTER, {token: access_token});

    res.sendStatus(201);
  }

  confirmUser(req: Request, res: Response, next: NextFunction) {

    res.end();
  }
}

export const userController = new UserController();
