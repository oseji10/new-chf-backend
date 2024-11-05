import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn
} from 'typeorm';
import { Regions } from './regions.entity';

@Entity('states')  // Explicitly set the table name for MySQL
export class States {
  @PrimaryGeneratedColumn()  // Auto-increment primary key
  stateId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })  // Specify type, length, and nullability for MySQL
  stateName: string;

  @ManyToOne(() => Regions, (regions) => regions.regionId)  // Relationship with Regions
  @JoinColumn()  // Join column for the relationship
  region: Regions;

  // Timestamp fields
 
  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
