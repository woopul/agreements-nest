import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner } from 'typeorm';

import { CreateTemplateFieldDto } from './dto/create-template-field.dto';
import { TemplateField } from './entities/template-field.entity';
import { TemplateFieldsRepository } from './template-fields.repository';

@Injectable()
export class TemplateFieldsService {
  constructor(
    @InjectRepository(TemplateFieldsRepository)
    private templateFieldsRepository: TemplateFieldsRepository,
  ) {}

  async createTemplateFields(
    {
      fields,
      templateId,
    }: {
      fields: CreateTemplateFieldDto[];
      templateId?: string;
    },
    queryRunner?: QueryRunner,
  ): Promise<TemplateField[]> {
    return this.templateFieldsRepository.createTemplateFields(
      fields,
      templateId,
      queryRunner,
    );
  }
}
