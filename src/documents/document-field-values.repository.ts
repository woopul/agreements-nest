import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { DocumentFieldValue } from './entities/document-field-value.entity';

@Injectable()
export class DocumentFieldValuesRepository extends Repository<DocumentFieldValue> {
  constructor(private readonly dataSource: DataSource) {
    super(DocumentFieldValue, dataSource.createEntityManager());
  }

  async createDocumentFieldValue(
    fieldValue: DocumentFieldValue,
    queryRunner?: QueryRunner,
  ) {
    if (queryRunner) {
      return await queryRunner.manager.save(fieldValue);
    }

    return await this.save(fieldValue);
  }

  async createDocumentFieldValues(
    fieldValues: DocumentFieldValue[],
    queryRunner?: QueryRunner,
  ) {
    if (queryRunner) {
      return await queryRunner.manager.save(fieldValues);
    }

    return await this.save(fieldValues);
  }
}
