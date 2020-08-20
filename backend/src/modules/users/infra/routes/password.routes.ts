import { Router } from 'express';

import ForgotPasswordController from '../http/controllers/ForgotPasswordController';
import ResetPasswordController from '../http/controllers/ResetPasswordController';

const sessionRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

sessionRoutes.post('/forgot', forgotPasswordController.create);
sessionRoutes.post('/reset', resetPasswordController.create);

export default sessionRoutes;
