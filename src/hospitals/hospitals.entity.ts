import { Doctors } from '../doctors/doctors.entity';
import { States } from '../states/states.entity';
import { Users } from '../users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

@Entity()
export class Hospitals {
  @PrimaryGeneratedColumn()
  hospitalId: number;

  @Column({ nullable: true })
  hospitalName: string;

  @Column({ nullable: true })
  hospitalShortName: string;

  @Column({ nullable: true })
  hospitalAddress: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  accountName: string;

  @Column({ type: 'varchar', nullable: true }) // Change type to varchar for accountNumber
  accountNumber: string; // Changed to string to allow for leading zeros

  @Column({ nullable: true })
  sortCode: string;

  // Relationships
  @ManyToOne(() => States, (state) => state.stateId, { nullable: true })
  @JoinColumn()
  state: States;

  // Uncomment and modify this relationship as needed
  // @OneToOne(() => Users, (users) => users.userId)
  // @JoinColumn()
  // hospitalAdmin: Users;

  @OneToMany(() => Doctors, (doctor) => doctor.hospital)
  doctors: Doctors[];

  // Timestamp fields
  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
