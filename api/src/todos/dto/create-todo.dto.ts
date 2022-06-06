import { IsNotEmpty } from "class-validator";
import { TodoStatus } from "../enums/todo.enums";

export class CreateTodoDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    dueDate: Date;

    @IsNotEmpty()
    userId: number;
}