// import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import FakeAppointmentRepository from '@modules/appointment/infra/repositories/fakes/FakeAppointmentRepository';

// import AppError from '@shared/errors/AppError';

import ListProvidersMonthAvailability from './ListProvidersMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProvidersMonthAvailability: ListProvidersMonthAvailability;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    listProvidersMonthAvailability = new ListProvidersMonthAvailability(
      fakeAppointmentRepository,
    );
  });
  it('should be able to return a list of providers', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 8, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 9, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 10, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 11, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 12, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 13, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 14, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 15, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 16, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 17, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 10, 21, 8, 0, 0),
    });

    const availables = await listProvidersMonthAvailability.execute({
      provider_id: 'user',
      month: 10,
      year: 2020,
    });

    expect(availables).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
