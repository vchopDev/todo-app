import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    //TODO: validate password against confirmPassword
    user.password = createUserDto.firstName;
    user.createdAt = user.updatedAt = new Date();
    return await user.save();
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: {id: id}
    })
  }

  async findByEmail(email: string) {
    return await this.userRepository.find({
      where: {email: email}
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {id: id}
    });
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.updatedAt = new Date();
    return await user.save();
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return {deleted: true}
  }
}
