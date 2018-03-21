import * as httpStatus from 'http-status';
import { Response } from 'express-serve-static-core';
import { parseErrors } from 'tree-house-errors';
import { ErrorSerializer } from 'jsonade';
import { logger } from '../lib/logger';

/**
 * ExpressJS responder to send success/error responses
*/
export const responder = {
  succes: (res: Response, { status = httpStatus.OK, payload, serializer }: ResponderOptions) => {
    if (!payload) return res.sendStatus(status);
    if (!serializer || !serializer.serialize) {
      return res.status(status).send(payload);
    }

    logger.debug('Response: ', serializer.serialize(payload));
    return res.status(status).json(serializer.serialize(payload));
  },
  error: (res: Response, errors: any) => {
    const parsedError = parseErrors(errors);
    const serializerError = ErrorSerializer.serialize([parsedError]);

    logger.error('Error response: ', serializerError);
    return res.status(parsedError.status).json(serializerError);
  },
};

// Type definitions
export interface ResponderOptions {
  status?: number;
  payload?: any;
  serializer?: any;
}