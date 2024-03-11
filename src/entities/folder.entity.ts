/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { CommonEntity } from './CommonEntity';
  
  @Entity({ name: 'folder' })
  export class FolderEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column({nullable:true})
    type: string;
    @Column({nullable:true})
    size: string;
    @Column({ type: 'jsonb', nullable: true })
    folderDescription: string
 
   
  }
  
