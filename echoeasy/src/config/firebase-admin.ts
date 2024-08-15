import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

@Injectable()
export class FirebaseAdminConfig {
  constructor(private configService: ConfigService) {}

  public initializeFirebaseAdminApp() {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.toString();

    console.log(privateKey);

    if (!privateKey) {
      throw new Error(
        'FIREBASE_PRIVATE_KEY não foi definida corretamente no arquivo .env',
      );
    }

    const adminConfig = {
      credential: admin.credential.cert({
        projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${this.configService.get<string>('FIREBASE_PROJECT_ID')}.firebaseio.com`,
    };

    const app = admin.initializeApp(adminConfig);
    return app;
  }
}

const firebaseAdminConfig = new FirebaseAdminConfig(new ConfigService());
const adminApp = firebaseAdminConfig.initializeFirebaseAdminApp();
const adminAuth = adminApp.auth();

export { adminApp, adminAuth };
