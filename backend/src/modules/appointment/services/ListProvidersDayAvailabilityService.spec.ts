import FakeAppointmentRepository from '@modules/appointment/infra/repositories/fakes/FakeAppointmentRepository';

// import AppError from '@shared/errors/AppError';

import ListProvidersDayAvailabilityService from './ListProvidersDayAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProvidersDayAvailabilityService: ListProvidersDayAvailabilityService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    listProvidersDayAvailabilityService = new ListProvidersDayAvailabilityService(
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
      date: new Date(2020, 9, 20, 10, 0, 0),
    });

    const availables = await listProvidersDayAvailabilityService.execute({
      provider_id: 'user',
      day: 20,
      month: 10,
      year: 2020,
    });

    expect(availables).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
