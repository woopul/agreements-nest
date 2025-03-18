import { ActiveUser } from '@/iam/authentication/decodators/active-user.decorator';
import { ActiveUserData } from '@/iam/authentication/interfaces/active-user-data.interface';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async getTemplates(@ActiveUser() user: ActiveUserData) {
    return await this.templatesService.getTemplates(user);
  }

  @Get()
  async getTemplateById(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: string,
  ) {
    return await this.templatesService.getTemplateById(user, id);
  }

  @Post()
  async createTemplate(
    @ActiveUser() user: ActiveUserData,
    @Body() createTemplateDto: CreateTemplateDto,
  ) {
    return await this.templatesService.createTemplate(user, createTemplateDto);
  }

  @Patch()
  async updateTemplate(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return await this.templatesService.updateTemplate(
      user,
      id,
      updateTemplateDto,
    );
  }
}
