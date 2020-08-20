import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';

// import AppError from '@shared/errors/AppError';

import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProvidersService = new ListProvidersService(fakeUserRepository);
  });
  it('should be able to return a list of providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    const user2 = await fakeUserRepository.create({
      name: 'John Tre',
      email: 'johntre@gmail.com',
      password: '123456',
    });
    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@gmail.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
