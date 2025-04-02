import { ActiveUserData } from '@/iam/authentication/interfaces/active-user-data.interface';
import { Template } from '@/templates/entities/template.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DocumentFieldValuesRepository } from './document-field-values.repository';
import { DocumentsRepository } from './documents.repository';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentFieldValue } from './entities/document-field-value.entity';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(DocumentsRepository)
    private readonly documentsRepository: DocumentsRepository,
    private readonly fieldValuesRepository: DocumentFieldValuesRepository,
  ) {}

  async create(
    user: ActiveUserData,
    createDocumentDto: CreateDocumentDto,
  ): Promise<Document> {
    const queryRunner =
      this.documentsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const document = new Document();
      document.owner = { id: user.sub } as User;
      document.template = { id: createDocumentDto.templateId } as Template;
      document.title = createDocumentDto.title;

      if (createDocumentDto.fieldValues) {
        const fieldValues = createDocumentDto.fieldValues.map(
          (fieldValueDto) => {
            const fieldValue = new DocumentFieldValue();
            Object.assign(fieldValue, fieldValueDto);
            return fieldValue;
          },
        );
        document.fieldValues =
          await this.fieldValuesRepository.createDocumentFieldValues(
            fieldValues,
            queryRunner,
          );
      } else {
        document.fieldValues = [];
      }

      const createdDocument = await this.documentsRepository.createDocument(
        document,
        queryRunner,
      );

      await queryRunner.commitTransaction();
      return createdDocument;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getDocuments(user: ActiveUserData): Promise<Document[]> {
    return this.documentsRepository.getDocuments(user);
  }

  async getDocumentById(user: ActiveUserData, id: string): Promise<Document> {
    const document = await this.documentsRepository.getDocumentById(user, id);

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return document;
  }

  async updateDocument(
    user: ActiveUserData,
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const document = await this.getDocumentById(user, id);

    Object.assign(document, updateDocumentDto);
    return this.documentsRepository.save(document);
  }

  async removeDocument(user: ActiveUserData, id: string): Promise<void> {
    // already throws NotFoundException if document does not exist
    await this.getDocumentById(user, id);
    await this.documentsRepository.removeDocument(user, id);
  }
}
