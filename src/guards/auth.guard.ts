import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../modules/user/enum/User.enum';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../common/constants';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id?: string;
      full_name?: string;
      email?: string;
      username?: string;
      access_level?: string;
      schema?: string;
      role?: string;
      permissions?: any[];
    }

    export interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    const [scheme, token] = request.headers.authorization.split(' ');

    if (scheme !== 'Bearer') {
      return false;
    }
    let user;
    try {
      user = this.jwtService.verify(token, { secret: JWT_SECRET });
    } catch (error) {
      user = null;
    }
    let role;
    if (typeof user === 'object' && user !== null) {
      role = user.role;
      request.user = user;
    } else {
      return false;
    }

    return requiredRoles.includes(role);
  }
}
