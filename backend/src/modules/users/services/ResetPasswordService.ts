import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import IUserTokenRepository from '@modules/users/infra/repositories/IUserTokenRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class SendForgotPasswordEmail {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token not exists');
    }
    const user = await this.userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User not exists');
    }
    const createdAt = userToken.created_at;
    const compareDates = addHours(createdAt, 2);

    if (isAfter(Date.now(), compareDates)) {
      throw new AppError('Token expired');
    }
    user.password = await this.hashProvider.generateHash(password);
    await this.userRepository.save(user);
  }
}
export default SendForgotPasswordEmail;
