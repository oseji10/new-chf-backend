import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './unauthorized-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend domain
    credentials: true, // Allow credentials (cookies) to be sent
  });
  await app.listen(3007);
}
bootstrap();
