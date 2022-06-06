import { IsNotEmpty } from 'class-validator'

export class UpdateUserDto {
        
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    updatedAt: Date;
}
