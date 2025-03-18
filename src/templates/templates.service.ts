import { ActiveUserData } from '@/iam/authentication/interfaces/active-user-data.interface';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTemplateFieldDto } from './dto/create-template-field.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TemplateField } from './entities/template-field.entity';
import { Template } from './entities/template.entity';
import { TemplateFieldsService } from './template-fields.service';
import {
  TEMPLATE_COMPARE_FIELDS,
  TEMPLATE_FIELD_COMPARE_FIELDS,
} from './templates.consts';
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
    return this.templatesRepository.getTemplateById(user, id);
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
        {
          fields: createTemplateDto.fields,
        },
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

  private mapUpdateTemplateTemplateFields(
    templateFieldsDto: CreateTemplateFieldDto[],
    templateFields: TemplateField[],
  ): {
    deleted: any[];
    modified: any[];
    new: any[];
    unmodified: any[];
  } {
    const updateTemplateTemplateFields = templateFieldsDto.reduce(
      (acc, templateField) => {
        if (!templateField.id) {
          acc.new.push(templateField); // ToDo: Add function to just pick properties that we're sure we want to send
          return acc;
        }

        const previouslyCreateTemplateField = templateFields.find(
          ({ id }) => id === templateField.id,
        );

        if (!previouslyCreateTemplateField) {
          acc.new.push(templateField); // ToDo: As above
          return acc;
        }

        if (
          TEMPLATE_FIELD_COMPARE_FIELDS.some(
            (fieldKey) =>
              !templateField[fieldKey] ||
              !previouslyCreateTemplateField[fieldKey] ||
              templateField[fieldKey] !==
                previouslyCreateTemplateField[fieldKey],
          )
        ) {
          acc.modified.push(templateField);
        } else {
          acc.unmodified.push(templateField);
        }

        return acc;
      },
      {
        // Operating on that will cause fields ordering to be wrong.
        // This needs to be done differently.
        deleted: [],
        modified: [],
        new: [],
        unmodified: [],
      },
    );

    templateFields.forEach((templateField) => {
      if (!templateFieldsDto.find(({ id }) => templateField.id === id)) {
        updateTemplateTemplateFields.deleted.push(templateField);
      }
    });

    return updateTemplateTemplateFields;
  }

  async updateTemplate(user: ActiveUserData, templateDto: CreateTemplateDto) {
    const queryRunner =
      this.templatesRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      if (!templateDto.id) {
        return this.createTemplate(user, templateDto);
      }

      const existingTemplate = await this.templatesRepository.getTemplateById(
        user,
        templateDto.id,
      );

      if (!existingTemplate) {
        return this.createTemplate(user, templateDto);
      }

      const templateFields = this.mapUpdateTemplateTemplateFields(
        templateDto.fields,
        existingTemplate.fields,
      );

      const areTemplateFieldsChanged =
        templateFields.new.length > 0 || templateFields.deleted.length > 0;

      const isTemplateChanged =
        TEMPLATE_COMPARE_FIELDS.some(
          (key) => templateDto[key] !== existingTemplate[key],
        ) || areTemplateFieldsChanged;

      if (isTemplateChanged) {
        const newFields = await this.templateFieldsService.createTemplateFields(
          {
            fields: [...templateFields.modified, ...templateFields.new],
            templateId: existingTemplate.id,
          },
          queryRunner,
        );

        const template = new Template();
        template.owner = {
          id: user.sub,
        } as User;
        template.name = templateDto.name;
        template.content = templateDto.content;
        template.fields = [...templateFields.unmodified, ...newFields];
        template.templateId = existingTemplate.templateId;

        const createdTemplate = await this.templatesRepository.createTemplate(
          template,
          queryRunner,
        );
        await queryRunner.commitTransaction();

        return createdTemplate;
      }

      return existingTemplate;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
