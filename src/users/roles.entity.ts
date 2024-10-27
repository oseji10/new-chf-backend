// src/auth/roles.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ unique: true })  // Ensure each role name is unique
  roleName: string;

  @ManyToMany(() => Users, (users) => users.roles)
  users: Users[];

  // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
