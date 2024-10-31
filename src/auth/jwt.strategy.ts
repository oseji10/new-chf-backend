import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
    const secret = process.env.JWT_SECRET || "6ytrew21!2wsxzaQ1!AgrippaZ";
    // console.log(secret)
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     return request?.cookies?.token; // Retrieve token from cookies
      //     ExtractJwt.fromAuthHeaderAsBearerToken(), 
      //   }
      // ]),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.token, // Retrieve from cookies
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Support Authorization header
      ]),
      
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any): Promise<Users> {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // Attach the user to the request
  }
}
