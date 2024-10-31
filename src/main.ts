import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './unauthorized-exception.filter';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
// config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config({ path: '.env.local' });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.enableCors({
    // origin: 'http://localhost:3002', // Replace with your frontend domain
    // credentials: true,
    origin: process.env.CLIENT_URL || 'http://localhost:3002',
  credentials: true, // Allow credentials (cookies) to be sent
  });
  app.use(cookieParser());
  await app.listen(3007);
}
bootstrap();
