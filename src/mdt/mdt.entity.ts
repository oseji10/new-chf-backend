import { Users } from '../users/users.entity';
import { Hospitals } from '../hospitals/hospitals.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class Mdts {
    @PrimaryGeneratedColumn()
    mdtId: number;

    @Column({ nullable: false }) // Made this non-nullable
    mdtName: string;

    @Column({ nullable: false }) // Made this non-nullable
    title: string;

    @Column({ nullable: false }) // Made this non-nullable
    department: string;

    @Column({ nullable: true, type: 'enum', enum: ['active', 'inactive'], default: 'active' }) // Corrected the enum type
    status: 'active' | 'inactive'; // Use union type for better type safety

    @ManyToOne(() => Hospitals, (hospital) => hospital.hospitalId, { nullable: false }) // Made hospital non-nullable
    @JoinColumn()
    hospital: Hospitals;

    @OneToOne(() => Users, (user) => user.userId, { nullable: true }) // Optional user
    @JoinColumn()
    user?: Users;

    // Timestamp fields
    @CreateDateColumn({ type: 'datetime', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: false })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt?: Date;
}
