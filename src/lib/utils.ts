import { Request } from 'express';
import { UnauthorizedError } from 'tree-house-errors';
import { Role, roles } from '../config/roles.config';
import { User } from '../models/user.model';
import { errors } from '../config/errors.config';

/**
 * Check whether a user has the correct role level or higher
 */
export function hasRole(user: User, role: Role): boolean {
  return user.role.level >= role.level;
}

/**
 * Find a user role by code
 */
export function findRoleByCode(code: string): Role {
  return roles[Object.keys(roles).find(x => roles[x].code === code)];
}

/**
 * Return the jwt token from the headers of an Express request
 */
export function extractJwt(req: Request) {
  const headers = req.headers['authorization'] as string;
  if (!headers) throw new UnauthorizedError(errors.MISSING_HEADERS);

  // Get accessToken out of header
  if (headers.split(' ')[0] !== 'Bearer') throw new UnauthorizedError(errors.MISSING_HEADERS);
  return headers.split(' ')[1];
}

/**
 * check if user has the right status for the operation
 */
export function checkStatus(user: User): void {
  if (user.status.code === 'COMPLETE_REGISTRATION') throw new UnauthorizedError(errors.USER_UNCONFIRMED);
  if (user.status.code === 'BLOCKED') throw new UnauthorizedError(errors.USER_BLOCKED);
}
