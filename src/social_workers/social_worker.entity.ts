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

@Entity('social_workers')  // Explicitly set the table name for MySQL
export class SocialWorkers {
    @PrimaryGeneratedColumn()  // Auto-increment primary key
    socialworkerId: number;

    @Column({ type: 'varchar', length: 255 })  // Specify type and length for MySQL
    socialworkerName: string;

    @Column({ type: 'varchar', length: 255 })  // Specify type and length for MySQL
    title: string;

    @Column({ type: 'varchar', length: 255 })  // Specify type and length for MySQL
    department: string;

    @Column({
        type: 'enum',
        enum: ['active', 'inactive'],  // Enum type for MySQL
        default: 'active'
    })
    status: 'active' | 'inactive';  // Use a string literal type for better type safety

    @ManyToOne(() => Hospitals, (hospital) => hospital.hospitalId)  // Many-to-One relation
    @JoinColumn({ name: 'hospitalId' })  // Explicitly set foreign key column name
    hospital: Hospitals;

    @OneToOne(() => Users, (users) => users.userId, { nullable: true })  // One-to-One relation
    @JoinColumn({ name: 'userId' })  // Explicitly set foreign key column name
    user: Users;

  
    @CreateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'datetime', nullable: false })  // Remove default value
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt?: Date;
}
