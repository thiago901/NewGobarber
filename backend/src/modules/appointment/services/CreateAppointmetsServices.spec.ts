import FakeAppointmentRepository from '@modules/appointment/infra/repositories/fakes/FakeAppointmentRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmetsService from './CreateAppointmetsService';

describe('CreateAppointmets', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmetsService = new CreateAppointmetsService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointmetsService.execute({
      date: new Date(),
      provider_id: '123564',
    });
    expect(appointment).toHaveProperty('id');
  });
  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmetsService = new CreateAppointmetsService(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);
    await createAppointmetsService.execute({
      date: appointmentDate,
      provider_id: '123564',
    });

    expect(
      createAppointmetsService.execute({
        date: appointmentDate,
        provider_id: '123564',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
