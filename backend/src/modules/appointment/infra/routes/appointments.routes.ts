import { Router } from 'express';

import ensureAuthenticad from '@modules/users/infra/http/middlewares/ensureAuthenticad';

import AppointmentsController from '../http/controllers/AppointmentsController';

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentsController();
appointmentsRoutes.use(ensureAuthenticad);

// appointmentsRoutes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });
appointmentsRoutes.post('/', appointmentsController.create);

export default appointmentsRoutes;
