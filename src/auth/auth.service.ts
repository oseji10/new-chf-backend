import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    // console.log("User retrieved:", user);

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // console.log("Is password valid:", isPasswordValid);

        if (isPasswordValid) {
            const { password, ...result } = user;
            return result;
        }
    }
    
    // console.log("Invalid credentials");
    return null;
}


// async login(email: string, password: string) {
//   const user = await this.validateUser(email, password);
//   if (!user) {
//     throw new UnauthorizedException('Invalid email or password');
//   }

  

//   const payload = { username: user.username, sub: user.userId };
//   return {
//     token: this.jwtService.sign(payload),
//   };
// }

async login(email: string, password: string) {
  const user = await this.validateUser(email, password);
  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // Map roles to a simpler array of role names
  const roles = user.roles.map((role) => role.roleName);

  const payload = { username: user.email, sub: user.userId, roles };
  return {
    token: this.jwtService.sign(payload),
    user: { id: user.userId, roles },
  };
}

}
