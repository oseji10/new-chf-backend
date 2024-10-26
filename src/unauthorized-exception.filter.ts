import { ExceptionFilter, Catch, UnauthorizedException, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(exception.getStatus())
      .json({
        statusCode: exception.getStatus(),
        message: 'Sorry, you need to log in to access this resource', // Custom message
      });
  }
}
