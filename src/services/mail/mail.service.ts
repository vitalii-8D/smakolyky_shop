import * as EmailTemplates from 'email-templates';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

import {ActionEnum, ResponseStatusCodesEnum} from '../../constants';
import {htmlTemplates} from '../../email-templates';
import {config} from '../../config';
import {ErrorHandler} from '../../errors';

if (
  !config.FRONTEND_URL
  || !config.ROOT_EMAIL
  || !config.ROOT_EMAIL_PASSWORD
  || !config.ROOT_EMAIL_SERVICE
) {
  throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'Root email credential are not defined');
}

const contextExtention = {
  frontendUrl: config.FRONTEND_URL
};

const transporter = nodemailer.createTransport({
  service: config.ROOT_EMAIL_SERVICE,
  auth: {
    user: config.ROOT_EMAIL,
    pass: config.ROOT_EMAIL_PASSWORD
  }
});

const emailTemplates = new EmailTemplates({
  message: {},
  views: {
    root: path.resolve(__dirname, '../../', 'email-templates')
  }
});

export class MailService {
  async sendEmail(email: string, action: ActionEnum, context: any = {}): Promise<any> {
    const emailInfo = htmlTemplates[action];

    if (!emailInfo) {
      throw new ErrorHandler(500, 'Template not found ;(');
    }

    Object.assign(context, contextExtention);

    const html = await emailTemplates.render(emailInfo.templateFileName, context);

    await transporter.sendMail({
      from: `NO REPLY <${config.ROOT_EMAIL}>`,
      to: email,
      subject: emailInfo.subject,
      html
    });
  }
}

export const emailService = new MailService();
