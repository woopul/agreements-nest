import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDocumentDto } from '../dto/create-document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { Document } from '../entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async findAll(): Promise<Document[]> {
    return this.documentsRepository.find();
  }

  async findOne(id: string): Promise<Document> {
    const document = await this.documentsRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
    return document;
  }

  async create(
    createDocumentDto: CreateDocumentDto,
    userId: string,
  ): Promise<Document> {
    const document = this.documentsRepository.create({
      ...createDocumentDto,
      userId,
    });
    return this.documentsRepository.save(document);
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const document = await this.findOne(id);
    this.documentsRepository.merge(document, updateDocumentDto);
    return this.documentsRepository.save(document);
  }

  async remove(id: string): Promise<void> {
    const document = await this.findOne(id);
    await this.documentsRepository.remove(document);
  }
}
