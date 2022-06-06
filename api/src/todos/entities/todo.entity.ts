import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { TodoStatus } from "../../todos/enums/todo.enums";

@Entity('todos')
export class Todo extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    dueDate: Date;

    @Column()
    status: TodoStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.todos)
    @JoinColumn({name: 'userId'})
    user: User

    @Column()
    userId: number

}
