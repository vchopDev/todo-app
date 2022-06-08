import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { APIMESSAGES } from './messages/api.messages';
import { UsersService } from '../users/users.service';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly userService: UsersService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const user = await this.userService.findById(createTodoDto.userId);
    if(!user) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: APIMESSAGES.TODO_CREATED_FAIL_USER_NOT_FOUND
      }, HttpStatus.BAD_REQUEST)
    }
    const result = await this.todosService.create(createTodoDto, user);
    return {
      message: APIMESSAGES.TODO_CREATED_SUCCESS,
      data: result
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  async findAll() {
    const result = await this.todosService.findAll();
    return {
      message: APIMESSAGES.TODO_FIND_SUCCESS,
      data: result
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.todosService.findOne(+id);
    return {
      message: APIMESSAGES.TODO_FIND_SUCCESS,
      data: result
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get(':userId')
  async finAllByUserId(@Param('userId') userId: string) {
    const result = await this.todosService.finAllByUserId(+userId);
    return {
      message: APIMESSAGES.TODO_FIND_SUCCESS,
      data: result
    }
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const result = await this.todosService.update(+id, updateTodoDto);
    return {
      message: APIMESSAGES.TODO_UPDATED_SUCCESS,
      data: result
    }
  }
  
  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.todosService.remove(+id);
    return {
      message: APIMESSAGES.TODO_CREATED_SUCCESS,
      deleted: result.deleted
    }
  }
}
