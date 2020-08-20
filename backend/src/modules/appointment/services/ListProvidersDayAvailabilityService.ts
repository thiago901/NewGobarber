import { inject, injectable } from 'tsyringe';

import { getDaysInMonth, getHours } from 'date-fns';

import IAppointmentRepository from '@modules/appointment/infra/repositories/IAppointmentRepository';
// import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;
@injectable()
class ListProvidersService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const startHour = 8;
    const eachHourArray = Array.from(
      {
        length: 10,
      },
      (_, index) => index + startHour,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        a => getHours(a.date) === hour,
      );
      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });
    return availability;
  }
}
export default ListProvidersService;
