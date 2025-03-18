import { IsNotEmpty } from 'class-validator';

export class CreateTemplateFieldDto {
  id?: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  name: string;

  isRequired?: boolean;
}
