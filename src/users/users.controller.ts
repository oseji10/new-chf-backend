import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UnauthorizedExceptionFilter } from '../unauthorized-exception.filter';

@Controller('users')
// @UseFilters(UnauthorizedExceptionFilter)

export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  @UseGuards(JwtAuthGuard) 
  @UseFilters(UnauthorizedExceptionFilter) 
  findAll() {
    return this.usersService.findAll();
  }

  // @Post(':userId/assign-role')
  // async assignRole(@Param('userId') userId: number, @Body('role') roleName: string) {
  //   await this.usersService.assignRole(userId, roleName);
  //   return { message: `Role ${roleName} assigned to user ${userId}` };
  // }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.usersService.findOne(id);
//   }

  @Post()
  create(@Body() users: Users) {
    return this.usersService.create(users);
  }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() users: Users) {
//     return this.usersService.update(id, users);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.usersService.remove(id);
//   }
}
