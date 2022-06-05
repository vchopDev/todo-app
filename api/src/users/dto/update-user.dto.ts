import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, Length, Matches } from 'class-validator'
import { MESSAGES } from '../validation/validation.messages';
import { RULES } from '../validation/validation.rules';


export class UpdateUserDto extends PartialType(CreateUserDto) {
        
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8,24)
    @Matches(RULES.PASSWORD_RULE, {
        message: MESSAGES.INVALID_PASSWORD
    })
    password: string;

    @IsNotEmpty()
    @Length(8,24)
    @Matches(RULES.PASSWORD_RULE, {
        message: MESSAGES.INVALID_PASSWORD
    })
    confirmPassword: string;

    updatedAt: Date;
}
