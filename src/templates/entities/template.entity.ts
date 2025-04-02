import { Document } from '@/documents/entities/document.entity';
import { User } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TemplateField } from './template-field.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  templateId: string;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column({ default: false })
  isPublished: boolean;

  // TODO: should there be a cascade here?
  // Can't templates be shared between users?
  @ManyToOne(() => User, (user) => user.templates, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: User;

  @ManyToMany(() => TemplateField, (field) => field.templates)
  @JoinTable({
    name: 'template_template_field',
  })
  fields: TemplateField[];

  @ManyToMany(() => Document, (document) => document.template)
  documents: Document[];

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
