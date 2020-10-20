import {ActionEnum} from '../constants';

interface EmailAction {
  [index: string]: { subject: string, templateFileName: string }
}

export const htmlTemplates: EmailAction = {
  [ActionEnum.USER_REGISTER]: {
    subject: 'Вітаємо',
    templateFileName: 'user-welcome'
  },
  [ActionEnum.FORGOT_PASSWORD]: {
    subject: 'Шо, пароль забув? :(',
    templateFileName: 'user-forgot-pass'
  }
};
