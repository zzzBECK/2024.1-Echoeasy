import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from 'src/config/firebase';
import { adminAuth } from 'src/config/firebase-admin';
import { GetUsuarioDto } from 'src/dto/GetUsuarioDto';
import { SignUpEmailDto } from 'src/dto/signup-email.dto';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { UsuarioDto } from 'src/dto/UsuarioDto';
import { UsuarioService } from './usuario.service';
@Injectable()
export class AuthService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async signUpWithEmail(payload: SignUpEmailDto) {
    const { email, password, name, lastname, cellphone } = payload;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      const usuarioData: UsuarioDto = {
        firebaseId: user.uid,
        email,
        lastname,
        name,
        cellphone,
        image: '',
      };

      await this.usuarioService.create(usuarioData);

      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            throw new HttpException(
              'Este email já está em uso. Por favor, escolha outro email.',
              HttpStatus.CONFLICT,
            );
          case 'auth/invalid-email':
            throw new HttpException(
              'O email fornecido é inválido. Por favor, verifique o email e tente novamente.',
              HttpStatus.BAD_REQUEST,
            );
          case 'auth/weak-password':
            throw new HttpException(
              'A senha fornecida é muito fraca. Por favor, escolha uma senha mais forte.',
              HttpStatus.BAD_REQUEST,
            );
          default:
            throw new HttpException(
              `Erro ao criar usuário: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      } else {
        throw new HttpException(
          `Erro ao criar usuário: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const existingUser = await this.usuarioService.findOne(email);

      if (!existingUser) {
        throw new HttpException(
          'Usuário não encontrado. Verifique o email e tente novamente.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        throw new HttpException(
          'Credenciais inválidas. Verifique suas credenciais e tente novamente.',
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(
          `Erro ao fazer login: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async updateUsuario(token: string, usuarioData: UpdateUsuarioDto) {
    const user = await this.getMe(token);

    if (usuarioData.email) {
      await adminAuth.updateUser(user.firebaseId, {
        email: usuarioData.email,
      });
    }

    return await this.usuarioService.update(user, usuarioData);
  }

  async getMe(token: string): Promise<GetUsuarioDto> {
    try {
      if (!token) {
        throw new HttpException(
          'Token não encontrado no cabeçalho de autorização.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const decodedToken: DecodedIdToken = await adminAuth.verifyIdToken(
        token.split(' ')[1],
      );
      const user = await this.usuarioService.findOne(decodedToken.email);

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar dados do usuário: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPasswordWithEmail(email: string) {
    try {
      const user = await this.usuarioService.findOne(email);

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado. Verifique o email e tente novamente.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const data = await sendPasswordResetEmail(auth, email);

      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
