import { Template } from '@/templates/entities/template.entity';
import { User } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DocumentFieldValue } from './document-field-value.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.documents, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: User;

  @Column({
    nullable: false,
  })
  title: string;

  @OneToMany(() => DocumentFieldValue, (fieldValue) => fieldValue.document)
  fieldValues: DocumentFieldValue[];

  @ManyToOne(() => Template, (template) => template.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  template: Template;

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
