import { ActiveUserData } from '@/iam/authentication/interfaces/active-user-data.interface';
import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { CreateTemplateDto } from './dto/create-template.dto';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplatesRepository extends Repository<Template> {
  constructor(private readonly dataSource: DataSource) {
    super(Template, dataSource.createEntityManager());
  }

  async getTemplates(user: ActiveUserData) {
    return await this.find({
      relations: ['fields'],
      where: {
        owner: {
          id: user.sub,
        },
      },
    });
  }

  async getTemplateById(user: ActiveUserData, id: string) {
    return await this.findOne({
      relations: ['fields'],
      where: {
        id,
        owner: {
          id: user.sub,
        },
      },
    });
  }

  async createTemplate(
    createTemplateDto: CreateTemplateDto,
    queryRunner?: QueryRunner,
  ) {
    const template = this.create(createTemplateDto);

    if (queryRunner) {
      return await queryRunner.manager.save(template);
    }

    return await this.save(template);
  }
}
