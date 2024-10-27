import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 11, nullable: true, unique: true })
  username: string;

  @Column({ length: 11, nullable: true, unique: true })
  phoneNumber: string;
  
   // Timestamp fields
   @CreateDateColumn({ type: 'timestamptz' })
   createdAt: Date;
  
   @UpdateDateColumn({ type: 'timestamptz' })
   updatedAt: Date;
  
   @DeleteDateColumn({ type: 'timestamptz', nullable: true })
   deletedAt?: Date;
}
