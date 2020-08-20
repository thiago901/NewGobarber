import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateAvatarInUsers {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('DiskFileStorage')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User is not exists', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    const filename = await this.storageProvider.saveFile(avatarFilename);
    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}
export default UpdateAvatarInUsers;
