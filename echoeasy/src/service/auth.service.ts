import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Model } from 'mongoose';
import { auth } from 'src/config/firebase';
import { adminAuth } from 'src/config/firebase-admin';
import { Usuario } from '../schema/Usuario';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async signUpWithEmail(payload: {
    email: string;
    password: string;
    name: string;
    lastname: string;
    role: string;
    cellphone: string;
  }) {
    const { email, password, name, lastname, role, cellphone } = payload;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      const newUser = new this.usuarioModel({
        firebaseId: user.uid,
        email,
        lastname,
        name,
        role,
        cellphone,
      });

      await newUser.save();

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
      const existingUser = await this.usuarioModel.findOne({ email }).exec();

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

  async getMe(token: string): Promise<{ email: string; name: string }> {
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
      const user = await this.usuarioModel
        .findOne({ email: decodedToken.email })
        .exec();

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }

      return { email: user.email, name: user.name };
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar dados do usuário: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
