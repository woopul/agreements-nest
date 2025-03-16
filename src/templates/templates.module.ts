import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateField } from './entities/template-field.entity';
import { Template } from './entities/template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Template, TemplateField])],
})
export class TemplatesModule {}
