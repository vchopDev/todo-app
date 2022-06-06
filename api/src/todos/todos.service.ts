import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { TodoStatus } from './enums/todo.enums';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, user: User) {
    const newTodo = new Todo();
    newTodo.title = createTodoDto.title;
    newTodo.content = createTodoDto.content;
    newTodo.dueDate = createTodoDto.dueDate;
    newTodo.status = TodoStatus.PAUSED;
    newTodo.createdAt = newTodo.updatedAt = new Date();
    newTodo.user = user;
    return await newTodo.save();
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    return await this.todoRepository.find({
      where: {id: id}
    });
  }

  async finAllByUserId(userId: number) {
    return await this.todoRepository.find({
      where: {userId: userId}
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: {id: id}
    });

    if(updateTodoDto.title && updateTodoDto.title.length > 0) 
      todo.title = updateTodoDto.title;

    if(updateTodoDto.content && updateTodoDto.content.length > 0)
      todo.content = updateTodoDto.content;

    if(updateTodoDto.dueDate)
      todo.dueDate = new Date(updateTodoDto.dueDate);
      
    if(updateTodoDto.status)
      todo.status = updateTodoDto.status
      
    return await todo.save();
  }

  async remove(id: number) {
    await this.todoRepository.delete(id);
    return {deleted: true}
  }
}
