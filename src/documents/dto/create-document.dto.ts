import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsObject()
  @IsNotEmpty()
  content: Record<string, any>; // or string?

  @IsUUID()
  @IsOptional()
  templateId?: string;
}
