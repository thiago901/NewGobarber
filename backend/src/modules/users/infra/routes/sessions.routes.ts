import { Router } from 'express';

import SessionsController from '../http/controllers/SessionsController';

const sessionRoutes = Router();
const sessionsController = new SessionsController();

sessionRoutes.post('/', sessionsController.create);

export default sessionRoutes;
