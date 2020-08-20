import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';

import AppError from '@shared/errors/AppError';

import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to return the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const userUpdate = await showProfileService.execute({
      user_id: user.id,
    });

    expect(userUpdate.name).toBe('John Doe');
    expect(userUpdate.email).toBe('johndoe@gmail.com');
  });
  it('should not be able to return the profile non-exist', async () => {
    expect(
      showProfileService.execute({
        user_id: 'non-exist-id-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
