import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentRepository from '@modules/appointment/infra/repositories/IAppointmentRepository';
import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentInMonthDTO from '@modules/appointment/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointment/dtos/IFindAllInDayFromProviderDTO';

class AppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllAppointmentInMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(app => {
      return (
        app.provider_id === provider_id &&
        getMonth(app.date) + 1 === month &&
        getYear(app.date) === year
      );
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(app => {
      return (
        app.provider_id === provider_id &&
        getDate(app.date) === day &&
        getMonth(app.date) + 1 === month &&
        getYear(app.date) === year
      );
    });
    return appointments;
  }

  public async findAppointment(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(a => isEqual(a.date, date));

    return appointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);
    return appointment;
  }
}
export default AppointmentRepository;
