import { ActiveUser } from '@/iam/authentication/decodators/active-user.decorator';
import { ActiveUserData } from '@/iam/authentication/interfaces/active-user-data.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  getDocuments(@ActiveUser() user: ActiveUserData): Promise<Document[]> {
    return this.documentsService.getDocuments(user);
  }

  @Get(':id')
  getDocumentById(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: string,
  ): Promise<Document> {
    return this.documentsService.getDocumentById(user, id);
  }

  @Post()
  createDocument(
    @ActiveUser() user: ActiveUserData,
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<Document> {
    return this.documentsService.create(user, createDocumentDto);
  }

  @Put(':id')
  updateDocument(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    return this.documentsService.updateDocument(user, id, updateDocumentDto);
  }

  @Delete(':id')
  deleteDocument(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: string,
  ): Promise<void> {
    return this.documentsService.removeDocument(user, id);
  }
}
