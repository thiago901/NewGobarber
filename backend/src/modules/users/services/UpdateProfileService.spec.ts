import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let updateProfileService: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const userUpdate = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Does',
      email: 'johndoe@gmail.com',
    });

    expect(userUpdate.name).toBe('John Does');
    expect(userUpdate.email).toBe('johndoe@gmail.com');
  });
  it('should not be able to update the profile with email alread used', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Julia Doe',
      email: 'juliadoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Does',
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the profile non-exist', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-exist-user',
        name: 'John Does',
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should  be able to update the password from profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Julia Doe',
      email: 'juliadoe@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Does',
      email: 'johndoe@gmail.com',
      old_password: '123456',
      password: '123123',
    });
    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password from profile without old_password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Julia Doe',
      email: 'juliadoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Does',
        email: 'johndoe@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password from profile wrong old_password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Julia Doe',
      email: 'juliadoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Does',
        email: 'johndoe@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
