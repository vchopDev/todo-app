import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { APIMESSAGES } from './messages/api.messages';
import { UsersService } from 'src/users/users.service';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const user = await this.userService.findById(createTodoDto.userId);
    const result = await this.todosService.create(createTodoDto, user);
    return {
      message: APIMESSAGES.TODO_CREATED_SUCCESS,
      data: result
    }
  }

  @Get()
  async findAll() {
    const result = await this.todosService.findAll();
    return {
      message: APIMESSAGES.TODO_FIND_SUCCESS,
      data: result
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.todosService.findOne(+id);
    return {
      message: APIMESSAGES.TODO_FIND_SUCCESS,
      data: result
    }
  }


  @Get(':userId')
  async finAllByUserId(@Param('userId') userId: string) {
    const result = await this.todosService.finAllByUserId(+userId);
    return {
      message: APIMESSAGES.TODO_FIND_SUCCESS,
      data: result
    }
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const result = await this.todosService.update(+id, updateTodoDto);
    return {
      message: APIMESSAGES.TODO_UPDATED_SUCCESS,
      data: result
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.todosService.remove(+id);
    return {
      message: APIMESSAGES.TODO_CREATED_SUCCESS,
      deleted: result.deleted
    }
  }
}
