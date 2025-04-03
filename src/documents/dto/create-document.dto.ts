import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';

export class CreateFieldValueDto {
  @IsString()
  field: string;

  @IsString()
  value: string;
}

export class CreateDocumentDto {
  @IsUUID()
  templateId: string;

  @IsString()
  title: string;

  // store each field value
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFieldValueDto)
  fieldValues: CreateFieldValueDto[];

  @IsUUID()
  @IsOptional()
  ownerId?: string;
}
