import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentsService } from './documents/services/documents.service';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const documentsService = app.get(DocumentsService);

  const testDocuments = [
    {
      title: 'Sample Agreement 1',
      content: {
        sections: [
          {
            title: 'Introduction',
            text: 'This is a sample agreement between Party A and Party B.',
          },
          {
            title: 'Terms and Conditions',
            text: 'These are the terms and conditions of the agreement.',
          },
        ],
      },
      userId: 'test-user-1',
    },
    {
      title: 'Sample Agreement 2',
      content: {
        sections: [
          {
            title: 'Project Scope',
            text: 'This document outlines the scope of the project.',
          },
          {
            title: 'Deliverables',
            text: 'List of deliverables and timelines.',
          },
        ],
      },
      userId: 'test-user-2',
    },
  ];

  for (const doc of testDocuments) {
    try {
      await documentsService.create(doc, doc.userId);
      console.log(`Created document: ${doc.title}`);
    } catch (error) {
      console.error(`Error creating document ${doc.title}:`, error.message);
    }
  }

  console.log('Seed completed!');
  await app.close();
}

seed();
