import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

@Entity('regions')  // Explicitly set the table name for MySQL
export class Regions {
  @PrimaryGeneratedColumn()  // Auto-increment primary key
  regionId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })  // Specify type, length, and nullability for MySQL
  shortName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })  // Specify type, length, and nullability for MySQL
  regionName: string;

  // Timestamp fields

  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
