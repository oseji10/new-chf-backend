import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  OneToOne
} from 'typeorm';
import { Roles } from './roles.entity';
import { Patients } from '../patients/patients.entity';
import { Doctors } from 'src/doctors/doctors.entity';

@Entity('users')  // Explicitly set the table name for MySQL
export class Users {
  @PrimaryGeneratedColumn()  // Auto-increment primary key
  userId: number;

  @Column({ type: 'varchar', length: 255, unique: true })  // Specify type and uniqueness for MySQL
  email: string;

  @Column({ type: 'varchar', length: 255 })  // Specify type for password
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })  // Specify type and length for username
  username: string;

  @Column({ type: 'varchar', length: 11, nullable: true, unique: true })  // Specify type and length for phoneNumber
  phoneNumber: string;

  // @ManyToMany(() => Roles, (roles) => roles.users, { cascade: true })  // Many-to-many relationship with Roles
  // @JoinTable({
  //     name: 'user_roles',  // Join table name
  //     joinColumn: { name: 'userId', referencedColumnName: 'userId' },
  //     inverseJoinColumn: { name: 'roleId', referencedColumnName: 'roleId' },
  // })
  // roles: Roles[];

  @ManyToOne(() => Roles, (role) => role.users) // Do NOT set cascade here
    roles: Roles;

  @OneToMany(() => Patients, (patient) => patient.user)  // One-to-many relationship with Patients
  patients: Patients[];

  @OneToOne(() => Doctors, (doctor) => doctor.user)
doctor: Doctors;


  @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
