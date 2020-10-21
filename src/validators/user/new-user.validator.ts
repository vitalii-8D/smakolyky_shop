import * as Joi from 'Joi';
import {GenderEnum, RegExpEnum} from '../../constants';

export const newUserValidator = Joi.object({
  name: Joi.string().trim().min(2).max(25).required(),
  surname: Joi.string().trim().min(2).max(25).required(),
  email: Joi.string().trim().regex(RegExpEnum.email).required(), // TO+DO const
  password: Joi.string().trim().regex(RegExpEnum.password).required(), // TO+DO const
  age: Joi.number().integer().min(1).max(120).required(),
  phone: Joi.string().trim().regex(RegExpEnum.phone), // TO+DO const
  gender: Joi.string().trim().allow(GenderEnum.MALE, GenderEnum.FEMALE).required() // TO+DO const
});
