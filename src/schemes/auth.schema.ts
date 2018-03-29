import * as Joi from 'joi';

export const authSchema = {
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      deviceId: Joi.string(),
    },
  },
};