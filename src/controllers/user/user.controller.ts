import {NextFunction, Request, Response} from 'express';
import {IRequestExtended, IUser} from '../../models';
import {emailService, userService} from '../../services';
import {newUserValidator} from '../../validators';
import {hashPassword, tokenizer} from '../../helpers';
import {ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum, UserStatusEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

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

  async confirmUser(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id, status} = req.user as IUser;
    const token = req.get(RequestHeadersEnum.AUTHORIZATION) as any;

    if (status !== UserStatusEnum.PENDING) {
      return next(
        new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_USER_ACTIVATED.message,
          customErrors.BAD_REQUEST_USER_ACTIVATED.code
        )
      );
    }

    await userService.updateUserByParams({_id}, {status: UserStatusEnum.CONFIRMED});
    await userService.removeActionToken(ActionEnum.USER_REGISTER, token);

    res.status(200).json('User confirmed!').end();
  }
}

export const userController = new UserController();
