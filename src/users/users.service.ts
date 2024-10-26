import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}


    // Find all users
    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
      }

  async create(userData: Partial<Users>): Promise<Users> {
    const salt = await bcrypt.genSalt(10); // Salt rounds can be adjusted
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });
    return await this.usersRepository.save(newUser);
  }


// async create(email: string, password: string, phoneNumber: string): Promise<Users> {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = this.usersRepository.create({
//       email,
//       password: hashedPassword,
//       phoneNumber,
      
//     });

//     return this.usersRepository.save(newUser);  // Save the new user to the database
//   }
  
  async findByEmail(email: string): Promise<Users | undefined> {
    // Ensure we use findOne to get a single Users instance
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<Users | undefined> {
    // Ensure we use findOne to get a single Users instance
    return await this.usersRepository.findOne({ where: { id } });
  }
}
