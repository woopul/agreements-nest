import { ActiveUserData } from '@/iam/authentication/interfaces/active-user-data.interface';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Template } from './entities/template.entity';
import { TemplateFieldsService } from './template-fields.service';
import { TemplatesRepository } from './templates.repository';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly templatesRepository: TemplatesRepository,
    private readonly templateFieldsService: TemplateFieldsService,
  ) {}

  getTemplates(user: ActiveUserData) {
    console.log(`[TemplatesService.getTemplates] for user: ${user.email}`);

    return this.templatesRepository.getTemplates(user);
  }

  getTemplateById(user: ActiveUserData, id: string) {
    return `getTemplateById id: ${id} for user: ${user.email}`;
  }

  async createTemplate(
    user: ActiveUserData,
    createTemplateDto: CreateTemplateDto,
  ) {
    const queryRunner =
      this.templatesRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const fields = await this.templateFieldsService.createTemplateFields(
        createTemplateDto.fields,
        queryRunner,
      );

      const template = new Template();
      template.owner = {
        id: user.sub,
      } as User;
      template.name = createTemplateDto.name;
      template.content = createTemplateDto.content;
      template.fields = fields;
      template.templateId = uuidv4();

      await this.templatesRepository.createTemplate(template, queryRunner);

      await queryRunner.commitTransaction();

      return template;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  updateTemplate(
    user: ActiveUserData,
    id: string,
    updateTemplateDto: UpdateTemplateDto,
  ) {
    // Updating a template does not actually updates a template but rather creates a new template with the same `templateId` as the original.
    // We fetch the template by `id`.
    // Compare content and fields with what was sent in the request and:
    // - if there are any changes done we take it's `templateId` value an create a new one with same `templateId`
    // - if there's no changes then we do no updates
    // We can also implement `Save as new` which would ignore `templateId` and not be listed in original template's history. In that case we would copy all `templateFields` too.
    console.log('[TemplatesService.updateTemplate]', updateTemplateDto);
    return `updateTemplate id ${id} for user: ${user.email}`;
  }
}
