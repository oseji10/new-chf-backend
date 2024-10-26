import { DataSource } from 'typeorm';
import { Users } from './users/users.entity';

import * as dotenv from 'dotenv';

dotenv.config(); 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '2wsxzaQ1!',
  database: process.env.DB_DATABASE || 'chf',
  // entities: [Patient, Hospital, User, Disease, State],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],  // Use TypeScript migration files
  synchronize: true,
  logging: true,  // Enable logging
});
