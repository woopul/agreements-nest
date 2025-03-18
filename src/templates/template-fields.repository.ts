import { Injectable } from '@nestjs/common';
import { Repository, DataSource, QueryRunner, In } from 'typeorm';
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
    templateId: string,
    queryRunner?: QueryRunner,
  ): Promise<TemplateField[]> {
    const fieldIds = fields.map(({ id }) => id).filter(Boolean);
    const existingFields = await this.find({
      where: { id: In(fieldIds), templates: { id: templateId } },
    });

    const existingFieldsMap = new Map(
      existingFields.map((field) => [field.id, field]),
    );

    const templateFields = fields.map((field) => {
      return this.create({
        isRequired: field.isRequired,
        name: field.name,
        templateFieldId: existingFieldsMap.has(field.id)
          ? existingFieldsMap.get(field.id).templateFieldId
          : uuidv4(),
        type: field.type,
      });
    });

    if (queryRunner) {
      return queryRunner.manager.save(templateFields);
    }

    return this.save(templateFields);
  }
}
