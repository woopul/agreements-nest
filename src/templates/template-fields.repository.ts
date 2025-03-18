import { Injectable } from '@nestjs/common';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateTemplateFieldDto } from './dto/create-template-field.dto';
import { TemplateField } from './entities/template-field.entity';

@Injectable()
export class TemplateFieldsRepository extends Repository<TemplateField> {
  constructor(private readonly dataSource: DataSource) {
    super(TemplateField, dataSource.createEntityManager());
  }

  async createTemplateFields(
    fields: CreateTemplateFieldDto[],
    queryRunner?: QueryRunner,
  ): Promise<TemplateField[]> {
    const templateFields = fields.map((field) => {
      return this.create({
        isRequired: field.isRequired,
        name: field.name,
        templateFieldId: uuidv4(),
        type: field.type,
      });
    });

    if (queryRunner) {
      return queryRunner.manager.save(templateFields);
    }

    return this.save(templateFields);
  }
}
