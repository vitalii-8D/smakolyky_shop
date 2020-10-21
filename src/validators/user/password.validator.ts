import * as Joi from 'Joi';
import {RegExpEnum} from '../../constants';

export const passwordValidator = Joi.object({
  password: Joi.string().trim().regex(RegExpEnum.password).required()
});
