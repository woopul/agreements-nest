import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateField } from './entities/template-field.entity';
import { Template } from './entities/template.entity';
import { TemplateFieldsRepository } from './template-fields.repository';
import { TemplateFieldsService } from './template-fields.service';
import { TemplatesController } from './templates.controller';
import { TemplatesRepository } from './templates.repository';
import { TemplatesService } from './templates.service';

@Module({
  controllers: [TemplatesController],
  imports: [TypeOrmModule.forFeature([Template, TemplateField])],
  providers: [
    TemplatesService,
    TemplatesRepository,
    TemplateFieldsService,
    TemplateFieldsRepository,
  ],
})
export class TemplatesModule {}
