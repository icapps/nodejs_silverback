import * as Joi from 'joi';

export const metaSchema = {
  findAllCodes: {
    params: {
      codeType: Joi.string().required(),
    },
    query: {
      offset: Joi.number(),
      limit: Joi.number(),
      sortOrder: Joi.string().valid('asc', 'desc'),
      sortField: Joi.string(),
      search: Joi.string(),
    },
  },
  createCode: {
    params: {
      codeType: Joi.string().required(),
    },
    body: {
      code: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string(),
    },
  },
};
