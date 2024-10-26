import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 11, nullable: true, unique: true })
  username: string;

  @Column({ length: 11, nullable: true, unique: true })
  phoneNumber: string;
  
  // Add other fields as needed
}
