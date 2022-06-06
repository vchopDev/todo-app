import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SETTINGS } from './validation/validation.pipes';
import { APIMESSAGES } from './messages/api.messages';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return {
      message: APIMESSAGES.USER_CREATED_SUCCESS,
      data: result
    }
  }

  @Get()
  async findAll() {
    const result = await this.usersService.findAll();
    return {
      message: APIMESSAGES.USER_FIND_SUCCESS,
      data: result
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.usersService.findById(+id);
    return {
      message: APIMESSAGES.USER_FIND_SUCCESS,
      data: result
    }
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    const result = await this.usersService.findByEmail(email);
    return {
      message: APIMESSAGES.USER_FIND_SUCCESS,
      data: result
    }
  }

  //TODO: update user left a bug if password passed on UpdateUserDto, the password will not be encrypt
  // need to handle that wrong behaviour
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto);
    return {
      message: APIMESSAGES.USER_UPDATED_SUCCESS,
      data: result
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    return {
      message: APIMESSAGES.USER_DELETED_SUCCESS,
      deleted: result.deleted
    }
  }
}
