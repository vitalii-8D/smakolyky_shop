import * as jwt from 'jsonwebtoken';
// import {promisify} from 'util';

import {ActionEnum, ResponseStatusCodesEnum} from '../constants';
import {config} from '../config';
import {ErrorHandler} from '../errors';

// const verify = promisify(jwt.verify);

export const tokenVerificator = (action: ActionEnum, token: string): any => {
  let isValid;

  switch (action) {
    case ActionEnum.USER_REGISTER:
      isValid = jwt.verify(token, config.JWT_CONFIRM_EMAIL_SECRET);
      break;

    case ActionEnum.FORGOT_PASSWORD:
      isValid = jwt.verify(token, config.JWT_PASS_RESET_SECRET);
      break;

    case ActionEnum.USER_AUTH:
      isValid = jwt.verify(token, config.JWT_SECRET);
      break;

    default:
      throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'Wrond action');
  }

  return isValid;
};
