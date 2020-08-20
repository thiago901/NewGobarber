import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import AppError from '@shared/errors/AppError';
import CreateUserSevice from './CreateUserSevice';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let createUserSevice: CreateUserSevice;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    createUserSevice = new CreateUserSevice(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUserSevice.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create two users on the same email', async () => {
    await createUserSevice.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    await expect(
      createUserSevice.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
