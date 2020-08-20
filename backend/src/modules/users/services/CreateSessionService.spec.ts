import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import AppError from '@shared/errors/AppError';
import CreateUserSevice from './CreateUserSevice';
import CreateSessionService from './CreateSessionService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let createUserSevice: CreateUserSevice;
let createSessionService: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserSevice = new CreateUserSevice(
      fakeUserRepository,
      fakeHashProvider,
    );
    createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a session', async () => {
    const user = await createUserSevice.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const response = await createSessionService.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a session with user incorrect', async () => {
    await expect(
      createSessionService.execute({
        email: 'johndo2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with password incorrect', async () => {
    await createUserSevice.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      createSessionService.execute({
        email: 'johndoe@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
