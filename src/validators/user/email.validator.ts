import * as Joi from 'Joi';
import {RegExpEnum} from '../../constants';

export const emailValidator = Joi.object({
  email: Joi.string().trim().regex(RegExpEnum.email).required()
});
