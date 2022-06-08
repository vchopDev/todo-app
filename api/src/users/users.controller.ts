import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SETTINGS } from './validation/validation.pipes';
import { APIMESSAGES } from './messages/api.messages';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return {
      message: APIMESSAGES.USER_CREATED_SUCCESS,
      data: result
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  async findAll() {
    const result = await this.usersService.findAll();
    return {
      message: APIMESSAGES.USER_FIND_SUCCESS,
      data: result
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.usersService.findById(+id);
    return {
      message: APIMESSAGES.USER_FIND_SUCCESS,
      data: result
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    const result = await this.usersService.findByEmail(email);
    return {
      message: APIMESSAGES.USER_FIND_SUCCESS,
      data: result
    }
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto);
    return {
      message: APIMESSAGES.USER_UPDATED_SUCCESS,
      data: result
    }
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    return {
      message: APIMESSAGES.USER_DELETED_SUCCESS,
      deleted: result.deleted
    }
  }
}
