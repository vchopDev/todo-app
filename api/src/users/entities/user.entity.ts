import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BaseEntity, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Todo } from "../../todos/entities/todo.entity";

@Entity('users')
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async setPassword(password: string) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(password || this.password, salt);
    }

    @OneToMany(() => Todo, todo => todo.user)
    todos: Todo[];
}
