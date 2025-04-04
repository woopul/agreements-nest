import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentFieldValuesRepository } from './document-field-values.repository';
import { DocumentsController } from './documents.controller';
import { DocumentsRepository } from './documents.repository';
import { DocumentsService } from './documents.service';
import { DocumentFieldValue } from './entities/document-field-value.entity';
import { Document } from './entities/document.entity';

@Module({
  controllers: [DocumentsController],
  exports: [DocumentsService],
  imports: [TypeOrmModule.forFeature([Document, DocumentFieldValue])],
  providers: [
    DocumentsService,
    DocumentsRepository,
    DocumentFieldValuesRepository,
  ],
})
export class DocumentsModule {}
