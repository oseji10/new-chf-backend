import { Users } from '../users/users.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn
} from 'typeorm';

@Entity()
export class Cmds {
  @PrimaryGeneratedColumn()
  cmdId: number;

  @Column()
  cmdName: string;

  @Column()
  title: string;

  @Column()
  department: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    nullable: true,
    default: 'active'
  })
  status: 'active' | 'inactive';  // TypeScript type for better type checking

  @ManyToOne(() => Hospitals, (hospital) => hospital.hospitalId, { nullable: false })
  @JoinColumn()
  hospital: Hospitals;

  @OneToOne(() => Users, (user) => user.userId, { nullable: true })
  @JoinColumn()
  user: Users;

  // Timestamp fields
  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
