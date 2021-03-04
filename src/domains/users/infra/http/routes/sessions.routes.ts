import { Router } from 'express';

import { SessionsController } from '@domains/users/infra/http/controllers/SessionsController';

export const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.store);
