import { PartialType } from '@nestjs/mapped-types';
import { TodoStatus } from '../enums/todo.enums';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    status: TodoStatus;
}
