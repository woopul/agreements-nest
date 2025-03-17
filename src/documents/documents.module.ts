import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentFieldValue } from './entities/document-field-value.entity';
import { Document } from './entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, DocumentFieldValue])],
})
export class DocumentsModule {}
