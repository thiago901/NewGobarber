import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import FakeUserTokenRepository from '@modules/users/infra/repositories/fakes/FakeUserTokenRepository';

import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;

let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123123',
      token,
    });
    const updateUser = await fakeUserRepository.findById(user.id);
    expect(updateUser?.password).toBe('123123');
  });
  it('should not be able to reset the password with existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token: 'non-exists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password with existing User', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'non-existing-user',
    );
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
