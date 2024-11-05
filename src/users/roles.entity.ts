import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm';
import { Users } from './users.entity';

@Entity('roles')  // Explicitly set the table name for MySQL
export class Roles {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  roleName: string;

  @OneToMany(() => Users, (user) => user.roles, { cascade: true })
  users: Users[];

  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
