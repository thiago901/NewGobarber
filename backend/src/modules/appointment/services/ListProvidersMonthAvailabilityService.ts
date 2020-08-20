import { inject, injectable } from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User';
import { getDaysInMonth, getDate } from 'date-fns';
// import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import IAppointmentRepository from '@modules/appointment/infra/repositories/IAppointmentRepository';
// import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}
type IResponse = Array<{
  day: number;
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
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (_, index) => index + 1,
    );
    const availability = eachDayArray.map(day => {
      const appointmentDay = appointments.filter(
        app => getDate(app.date) === day,
      );
      return {
        day,
        available: appointmentDay.length < 10,
      };
    });
    return availability;
  }
}
export default ListProvidersService;
