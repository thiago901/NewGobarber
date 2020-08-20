import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticad from '@modules/users/infra/http/middlewares/ensureAuthenticad';
import uploadConfig from '@config/multerConfig';

import UsersController from '../http/controllers/UsersController';
import UserAvatarController from '../http/controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userRoutes = Router();
const upload = multer(uploadConfig);

userRoutes.post('/', usersController.create);

userRoutes.patch(
  '/avatar',
  ensureAuthenticad,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRoutes;
