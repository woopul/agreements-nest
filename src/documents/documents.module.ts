import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentsService } from './documents.service';
import { DocumentFieldValue } from './entities/document-field-value.entity';
import { Document } from './entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, DocumentFieldValue])],
  providers: [DocumentsService],
})
export class DocumentsModule {}
