// src/users/users.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, JoinColumn, OneToMany } from 'typeorm';
import { Roles } from './roles.entity';
import { Patients } from 'src/patients/patients.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column({ length: 11, nullable: true, unique: true })
  phoneNumber: string;

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinColumn()
  @JoinTable({
    name: 'user_roles',  // join table name
    joinColumn: { name: 'userId', referencedColumnName: 'userId' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'roleId' },
  })
  roles: Roles[];

  // @ManyToMany(() => Roles, (role) => role.users)
  // @JoinTable()
  // roles: Roles[];
  
  // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  // @OneToMany(() => Patients, (patient) => patient.user)
  //   patients: Patients[];
}
