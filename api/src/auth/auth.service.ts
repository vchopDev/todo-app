import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(userEmail: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(userEmail);
        if(user && await bcrypt.compare(password, user.password)) {
            const {password, ...rest} = user;
            return rest;
        }
        
        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, id: user.id};

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
