import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsObject()
  @IsOptional()
  content?: Record<string, any>; // or to discuss if string would be sufficient ?;

  @IsUUID()
  @IsOptional()
  templateId?: string;
}
