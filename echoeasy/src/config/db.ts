import { MongooseModule } from '@nestjs/mongoose';

export const MongoConnect = MongooseModule.forRoot(
  'mongodb://localhost/echoeazy',
);
