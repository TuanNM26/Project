import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../modules/user/enum/User.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
