import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '6ytrew21!2wsxzaQ1!AgrippaZ', // Use the same secret as in JwtModule
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, username: payload.username };
  //   // return { userId: payload.sub, username: payload.username };
  // }

  async validate(payload: any): Promise<Users> {
    const user = await this.usersService.findById(payload.sub);
    return user; // Attach the user to the request
  }
}
