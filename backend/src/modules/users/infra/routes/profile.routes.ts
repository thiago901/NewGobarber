import { Router } from 'express';

import ensureAuthenticad from '@modules/users/infra/http/middlewares/ensureAuthenticad';

import ProfileController from '../http/controllers/ProfileController';

const profileController = new ProfileController();

const profileRoutes = Router();

profileRoutes.use(ensureAuthenticad);

profileRoutes.put('/', profileController.update);
profileRoutes.get('/', profileController.show);

export default profileRoutes;
