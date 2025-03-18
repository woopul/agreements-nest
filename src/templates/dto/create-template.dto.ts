import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

import { CreateTemplateFieldDto } from './create-template-field.dto';

export class CreateTemplateDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsOptional()
  isPublished: boolean;

  fields: CreateTemplateFieldDto[];
}
