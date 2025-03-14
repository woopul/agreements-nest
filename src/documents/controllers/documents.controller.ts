import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { CreateDocumentDto } from '../dto/create-document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { DocumentsService } from '../services/documents.service';

@Controller('document')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    const userId = 'temp-user-id';
    return this.documentsService.create(createDocumentDto, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
