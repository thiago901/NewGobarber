import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserSevice {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserEmailExists = await this.userRepository.findByEmail(email);
    if (checkUserEmailExists) {
      throw new AppError('Email address alredy exist');
    }
    const passwordHashed = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    // delete user.password;
    return user;
  }
}
export default CreateUserSevice;
