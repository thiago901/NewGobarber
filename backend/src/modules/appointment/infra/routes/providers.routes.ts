import { Router } from 'express';

import ensureAuthenticad from '@modules/users/infra/http/middlewares/ensureAuthenticad';

import ProvidersController from '../http/controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();
providersRouter.use(ensureAuthenticad);

providersRouter.get('/', providersController.index);

export default providersRouter;
