import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';

import IAppointmentRepository from '@modules/appointment/infra/repositories/IAppointmentRepository';
import AppointmentRepository from '@modules/appointment/infra/typeorm/repositories/AppointmentRepository';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/infra/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokesRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);
