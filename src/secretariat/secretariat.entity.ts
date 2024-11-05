import { Users } from '../users/users.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity('secretariats')  // Explicitly set the table name for MySQL
export class Secretariats {
    @PrimaryGeneratedColumn()  // Auto-increment primary key
    secretariatId: number;

    @Column({ type: 'varchar', length: 255 })  // Specify type and length for secretariatName
    secretariatName: string;

    @Column({ type: 'varchar', length: 100 })  // Specify type and length for title
    title: string;

    @Column({ type: 'varchar', length: 100 })  // Specify type and length for department
    department: string;

    @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })  // Use enum type for status
    status: string;

    @ManyToOne(() => Hospitals, (hospital) => hospital.hospitalId, { nullable: false })  // Many-to-one relationship with Hospitals
    @JoinColumn()
    hospital: Hospitals;

    @OneToOne(() => Users, (users) => users.userId, { nullable: true })  // One-to-one relationship with Users
    @JoinColumn()
    user: Users;

  
    @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt?: Date;
}
