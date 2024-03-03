/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { CommonEntity } from './CommonEntity';
  
  @Entity({ name: 'file' })
  export class FileEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    fileId: string;
    @Column({nullable:true})
    type: string;
    @Column({nullable:true})
    size: string;
    @Column({ type: 'jsonb', nullable: true })
    fileDescription: any
    @Column({ type: 'jsonb', nullable: true })
    folderDescription: string
 
   
  }
  
