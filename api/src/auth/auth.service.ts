import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(userEmail: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(userEmail);
        if(user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        
        return null;
    }
}
