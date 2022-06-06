import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'
import { Match } from '../customDecorators/match.decorator';
import { MESSAGES } from '../validation/validation.messages';
import { RULES } from '../validation/validation.rules';

export class CreateUserDto {
    
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8,24)
    @Matches(RULES.PASSWORD_RULE, {
        message: MESSAGES.INVALID_PASSWORD
    })
    password: string;

    @IsNotEmpty()
    @Length(8,24)
    @Match('password', {
        message: MESSAGES.INVALID_PASSWORDS_NOT_EQUAL
    })
    confirmPassword: string;
}
