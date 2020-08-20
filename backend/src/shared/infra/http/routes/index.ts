import { Router } from 'express';
import appointmentsRoutes from '@modules/appointment/infra/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/routes/sessions.routes';
import passwordRoutes from '@modules/users/infra/routes/password.routes';
import profileRoutes from '@modules/users/infra/routes/profile.routes';
import providersRoutes from '@modules/appointment/infra/routes/providers.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);
routes.use('/providers', providersRoutes);
export default routes;
