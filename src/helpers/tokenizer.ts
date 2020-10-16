import * as jwt from 'jsonwebtoken';

import {ActionEnum} from '../constants';
import {config} from '../config';
import {ErrorHandler} from '../errors';

export const tokenizer = (action: ActionEnum): { access_token: string, refresh_token: string } => {
  let access_token = '';
  let refresh_token = '';

  switch (action) {
    case ActionEnum.USER_REGISTERED:
      access_token = jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET, {expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME});
      break;
    default:
      throw new ErrorHandler(500, 'Wrond action');
  }

  return {
    access_token,
    refresh_token
  };
};
