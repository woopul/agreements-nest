import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './iam/iam.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'postgres',
      host: 'localhost',
      password: 'pass123',
      port: 5432,
      synchronize: true,
      type: 'postgres',
      username: 'postgres',
    }),
    IamModule,
  ],
  providers: [AppService],
})
export class AppModule {}
