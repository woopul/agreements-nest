import { IsNotEmpty } from 'class-validator';

export class CreateTemplateFieldDto {
  templateFieldId?: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  name: string;

  isRequired?: boolean;
}
