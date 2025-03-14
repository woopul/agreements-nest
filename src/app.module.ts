import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'agreement_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
