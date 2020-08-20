import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointment/infra/repositories/IAppointmentRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmetsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentData = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findAppointment(
      appointmentData,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointments already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentData,
    });

    return appointment;
  }
}

export default CreateAppointmetsService;
