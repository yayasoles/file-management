/* eslint-disable prettier/prettier */
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"
export class CommonEntity{
    @CreateDateColumn({ type: 'timestamp' })
    createdAt:Date 
    createdBy:string 
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt:Date 
    updatedBy:string 
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt:Date 
    deletedBy:string 
}