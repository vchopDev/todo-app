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
    createUserDto.createdAt = createUserDto.updatedAt = new Date();
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.find({
      where: {id: id}
    })
  }

  async findByEmail(email: string) {
    return await this.userRepository.find({
      where: {email: email}
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.updatedAt = new Date();
    await this.userRepository.update({id}, updateUserDto);
    return await this.userRepository.find({
      where: {id: id}
    })
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return {deleted: true}
  }
}
