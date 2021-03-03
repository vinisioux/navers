import { Router } from 'express';

import { usersRouter } from '@domains/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);

export { routes };
