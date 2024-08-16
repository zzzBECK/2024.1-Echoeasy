import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { adminAuth } from 'src/config/firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const idToken = context.getArgs()[0]?.headers?.authorization;

    if (!idToken) {
      throw new UnauthorizedException(
        'Token não encontrado no cabeçalho de autorização',
      );
    }

    try {
      // Verify the Firebase token
      const decodedToken = await adminAuth.verifyIdToken(idToken.split(' ')[1]);

      // If the token is valid, allow access
      return !!decodedToken;
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
