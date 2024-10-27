import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne, } from 'typeorm';
// import { States } from '../states/states.entity';
// import { States } from '../users/users.entity';

@Entity()
export class Regions {
  @PrimaryGeneratedColumn()
    regionId: number;
  
    @Column({nullable: true})
    regionName: string;
  
   
     // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) // 'timestamptz' stores timezone info
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

}
