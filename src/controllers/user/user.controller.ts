import {NextFunction, Request, Response} from 'express';
import {IRequestExtended, IUser} from '../../models';
import {emailService, logService, userService} from '../../services';
// import {newUserValidator} from '../../validators';
import {hashPassword, tokenizer} from '../../helpers';
import {ActionEnum, LogsEnum, RequestHeadersEnum, ResponseStatusCodesEnum, UserStatusEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

// import * as Joi from 'joi';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    // TO+DO validate user (transfered to check-is-user-valid middleware)
    /*const {error} = await newUserValidator.validate(user);

    if (error) {
      return next(new Error(error.details[0].message));
    }*/
    // TO+DO hash password
    user.password = await hashPassword(user.password);

    const {_id} = await userService.createUser(user);

    const {access_token} = tokenizer(ActionEnum.USER_REGISTER);

    // TO+DO token in database
    await userService.addActionToken(_id, {token: access_token, action: ActionEnum.USER_REGISTER});

    await emailService.sendEmail(user.email, ActionEnum.USER_REGISTER, {token: access_token});

    await logService.createLog({event: LogsEnum.USER_REGISTERED, userId: _id});

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

    await logService.createLog({event: LogsEnum.USER_CONFIRMED, userId: _id});

    res.status(200).json('User confirmed!').end();
  }

  async forgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id, email, tokens = []} = req.user as IUser;

    const {access_token} = tokenizer(ActionEnum.FORGOT_PASSWORD);

    if (tokens.length > 0) {
      const tokenExists = tokens.find(tokenObj => tokenObj.action === ActionEnum.FORGOT_PASSWORD);
      if (tokenExists) {
        const removedToken = tokenExists.token || '';
        await userService.removeActionToken(ActionEnum.FORGOT_PASSWORD, removedToken);
      }
    }

    await userService.addActionToken(_id, {action: ActionEnum.FORGOT_PASSWORD, token: access_token});

    await emailService.sendEmail(email, ActionEnum.FORGOT_PASSWORD, {token: access_token});

    await logService.createLog({userId: _id, event: LogsEnum.PASSWORD_RESET_REQUEST});

    res.status(200).json('Mail sended!').end();
  }

  async setForgotPass(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const {password} = req.body;
    const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION) as string;
    const hashPass = await hashPassword(password);

    await userService.updateUserByParams({_id}, {password: hashPass});

    await userService.removeActionToken(ActionEnum.FORGOT_PASSWORD, tokenToDelete);

    await logService.createLog({userId: _id, event: LogsEnum.PASSWORD_CHANGED});

    res.end();
  }
}

export const userController = new UserController();
