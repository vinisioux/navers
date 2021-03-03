import { Router } from 'express';

import { NaversController } from '@domains/navers/infra/http/controllers/NaversController';
import { ensureAuthenticated } from '@domains/users/infra/http/middlewares/ensureAuthenticated';

const naversRouter = Router();

const naversController = new NaversController();

naversRouter.post('/', ensureAuthenticated, naversController.create);

export { naversRouter };
