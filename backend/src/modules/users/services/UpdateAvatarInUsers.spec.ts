import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import AppError from '@shared/errors/AppError';
import FakeDiskFileStorage from '@shared/container/providers/StorageProvider/fakes/FakeDiskFileStorage';
import UpdateAvatarInUsers from './UpdateAvatarInUsers';

let fakeDiskFileStorage: FakeDiskFileStorage;
let fakeUserRepository: FakeUserRepository;
let updateAvatarInUsers: UpdateAvatarInUsers;

describe('UpdataAvatarUsers', () => {
  beforeEach(() => {
    fakeDiskFileStorage = new FakeDiskFileStorage();
    fakeUserRepository = new FakeUserRepository();

    updateAvatarInUsers = new UpdateAvatarInUsers(
      fakeUserRepository,
      fakeDiskFileStorage,
    );
  });
  it('should be able to update the avatar from user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    await updateAvatarInUsers.execute({
      avatarFilename: 'nomeAvatar.jpg',
      user_id: user.id,
    });

    expect(user.avatar).toBe('nomeAvatar.jpg');
  });
  it('should not be able to update the avatar from user inexists', async () => {
    await expect(
      updateAvatarInUsers.execute({
        avatarFilename: 'nomeAvatar.jpg',
        user_id: 'qqrrcoisa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to delete to update the avatar from user', async () => {
    const deleteFile = jest.spyOn(fakeDiskFileStorage, 'deleteFile');
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    await updateAvatarInUsers.execute({
      avatarFilename: 'nameAvatar.jpg',
      user_id: user.id,
    });
    await updateAvatarInUsers.execute({
      avatarFilename: 'newNameAvatar.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('nameAvatar.jpg');
    expect(user.avatar).toBe('newNameAvatar.jpg');
  });
});
