import * as jwt from 'jsonwebtoken';

import {ActionEnum, ResponseStatusCodesEnum} from '../constants';
import {config} from '../config';
import {ErrorHandler} from '../errors';

export const tokenizer = (action: ActionEnum): { access_token: string, refresh_token: string } => {
  let access_token = '';
  let refresh_token = '';

  switch (action) {
    case ActionEnum.USER_REGISTER:
      access_token = jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET, {expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME});
      break;

    case ActionEnum.FORGOT_PASSWORD:
      access_token = jwt.sign({}, config.JWT_PASS_RESET_SECRET, {expiresIn: config.JWT_PASS_RESET_LIFETIME});
      break;

    case ActionEnum.USER_AUTH:
      access_token = jwt.sign({}, config.JWT_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
      refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: config.REFRESH_TOKEN_LIFETIME});
      break;

    default:
      throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'Wrond action');
  }

  return {
    access_token,
    refresh_token
  };
};
