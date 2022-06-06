import { IsDate, IsNotEmpty, Length } from "class-validator";

export class CreateTodoDto {

    @IsNotEmpty()
    @Length(1,200)
    title: string;

    @IsNotEmpty()
    @Length(1,600)
    content: string;

    @IsNotEmpty()
    @IsDate()
    dueDate: Date;

    @IsNotEmpty()
    userId: number;
}