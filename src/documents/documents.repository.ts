import { ActiveUserData } from '@/iam/authentication/interfaces/active-user-data.interface';
import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsRepository extends Repository<Document> {
  constructor(private readonly dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }

  async getDocuments(user: ActiveUserData) {
    return await this.find({
      where: {
        owner: {
          id: user.sub,
        },
      },
    });
  }

  async getDocumentById(user: ActiveUserData, id: string) {
    return await this.findOne({
      where: {
        id,
        owner: {
          id: user.sub,
        },
      },
    });
  }

  async createDocument(document: Document, queryRunner?: QueryRunner) {
    if (queryRunner) {
      return await queryRunner.manager.save(document);
    }

    return await this.save(document);
  }

  async removeDocument(user: ActiveUserData, id: string) {
    return await this.delete({
      id,
      owner: {
        id: user.sub,
      },
    });
  }
}
