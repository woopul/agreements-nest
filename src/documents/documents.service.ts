import { ActiveUserData } from '@/iam/authentication/interfaces/active-user-data.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentFieldValue } from './entities/document-field-value.entity';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
    @InjectRepository(DocumentFieldValue)
    private readonly fieldValuesRepository: Repository<DocumentFieldValue>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const document = this.documentsRepository.create(createDocumentDto);

    if (createDocumentDto.fieldValues) {
      const fieldValues = createDocumentDto.fieldValues.map((fieldValue) =>
        this.fieldValuesRepository.create(fieldValue),
      );
      document.fieldValues = fieldValues;
    }

    return this.documentsRepository.save(document);
  }

  async findAll(user: ActiveUserData): Promise<Document[]> {
    return this.documentsRepository.find({
      relations: ['fieldValues', 'template'],
      where: { owner: { email: user.email } },
    });
  }

  async findOne(id: string): Promise<Document> {
    const document = await this.documentsRepository.findOne({
      where: { id },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return document;
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const document = await this.findOne(id);

    Object.assign(document, updateDocumentDto);
    return this.documentsRepository.save(document);
  }

  async remove(id: string): Promise<void> {
    const document = await this.findOne(id);
    await this.documentsRepository.remove(document);
  }
}
