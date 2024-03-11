/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { CommonEntity } from './CommonEntity';
  @Entity({ name: 'form' })
  export class FormEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column({ type: 'jsonb', nullable: true })
    design: any
    @Column({ type: 'jsonb', nullable: true })
    formData: string
  }
  
