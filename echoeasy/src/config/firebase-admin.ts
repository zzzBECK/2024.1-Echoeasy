import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import * as process from 'process';
dotenv.config();

@Injectable()
export class FirebaseAdminConfig {
  constructor(private configService: ConfigService) {}

  public initializeFirebaseAdminApp() {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.toString();

    const adminConfig = {
      credential: admin.credential.cert({
        projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${this.configService.get<string>('FIREBASE_PROJECT_ID')}.firebaseio.com`,
      storageBucket: `${this.configService.get<string>('FIREBASE_BUCKET_ID')}.appspot.com`,
    };

    const app = admin.initializeApp(adminConfig);
    return app;
  }
}

const firebaseAdminConfig = new FirebaseAdminConfig(new ConfigService());
const adminApp = firebaseAdminConfig.initializeFirebaseAdminApp();
const adminAuth = adminApp.auth();
const adminStorage = adminApp.storage().bucket();
export { adminApp, adminAuth, adminStorage };
