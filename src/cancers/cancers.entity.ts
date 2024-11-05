import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
  } from 'typeorm';
  
  @Entity()
  export class Cancers {
    @PrimaryGeneratedColumn()
    cancerId: number;
  
    @Column()
    cancerName: string;
  
    @Column({
      type: 'enum',
      enum: ['active', 'inactive'],
      nullable: true,
      default: 'active'
    })
    status: 'active' | 'inactive';  // TypeScript type for better type checking
  
    @CreateDateColumn({ type: 'datetime', nullable: false })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'datetime', nullable: false })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt?: Date;
  }
  