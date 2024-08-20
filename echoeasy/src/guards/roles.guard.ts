import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { AuthService } from 'src/service/auth.service';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('requiredRoles', requiredRoles);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    const user = await this.authService.getMe(token);
    const hasRole = requiredRoles.includes(RolesEnum[user.role.toUpperCase()]);

    if (!hasRole) {
      throw new ForbiddenException(
        'Access Denied: User does not have the necessary permissions.',
      );
    }

    return hasRole;
  }
}
