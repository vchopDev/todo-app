import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import * as crypto from "crypto";

@Entity('users')
export class User {
    
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

    @BeforeInsert()
    hashPassword() {
      this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
