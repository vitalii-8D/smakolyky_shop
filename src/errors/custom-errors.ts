export const customErrors = {
  //400
  BAD_REQUEST_USER_REGISTERED: {
    message: 'User is already registered',
    code: 4001
  },
  BAD_REQUEST_USER_ACTIVATED: {
    message: 'User already activated',
    code: 4002
  },
  BAD_REQUEST_USER_ALREADY_LOGED_IN: {
    message: 'User already loged in',
    code: 4002
  },

  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not present'
  },

  //403
  FORBIDDEN_USER_NOT_CONFIRMED: {
    message: 'User is not confirmed',
    code: 4031
  },
  FORBIDDEN_WRONG_CREDENTIALS: {
    message: 'Wrong email or password',
    code: 4032
  },

  //404
  NOT_FOUND: {
    message: 'Record not found'
  }
};
