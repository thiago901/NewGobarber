import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentRepository from '@modules/appointment/infra/repositories/IAppointmentRepository';
import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentInMonthDTO from '@modules/appointment/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointment/dtos/IFindAllInDayFromProviderDTO';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllAppointmentInMonthDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          field => `to_chart(${field},MM-YYYY)='${parsedMonth}-${year}'`,
        ),
      },
    });
    return appointment;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          field =>
            `to_chart(${field}, DD-MM-YYYY)='${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });
    return appointment;
  }

  public async findAppointment(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date },
    });
    return appointment || undefined;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);
    return appointment;
  }
}
export default AppointmentRepository;
