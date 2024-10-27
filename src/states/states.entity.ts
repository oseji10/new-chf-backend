import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn, } from 'typeorm';
import { Regions } from './regions.entity';
// import { States } from '../states/states.entity';
// import { States } from '../users/users.entity';

@Entity()
export class States {
  @PrimaryGeneratedColumn()
    stateId: number;
  
    @Column({nullable: true})
    stateName: string;

    
    @ManyToOne(() => Regions, (regions) => regions.regionId)
  @JoinColumn()
  region: Regions;
   
     // Timestamp fields
  @CreateDateColumn({ type: 'timestamptz' }) // 'timestamptz' stores timezone info
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft delete field
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

}
