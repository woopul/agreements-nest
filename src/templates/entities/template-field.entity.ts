import { DocumentFieldValue } from '@/documents/entities/document-field-value.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Template } from './template.entity';

@Entity()
export class TemplateField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  templateFieldId: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column({ default: false })
  isRequired: boolean;

  @ManyToMany(() => Template, (template) => template.fields)
  templates: Template[];

  @OneToMany(() => DocumentFieldValue, (fieldValue) => fieldValue.templateField)
  fieldValues: DocumentFieldValue[];

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    type: 'timestamp',
  })
  updatedAt: Date;
}
