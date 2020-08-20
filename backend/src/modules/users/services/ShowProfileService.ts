import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}
@injectable()
class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }
    return user;
  }
}
export default ShowProfileService;
