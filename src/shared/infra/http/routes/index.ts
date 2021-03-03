import { Router } from 'express';

import { usersRouter } from '@domains/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@domains/users/infra/http/routes/sessions.routes';
import { naversRouter } from '@domains/navers/infra/http/routes/navers.routes';
import { projectsRouter } from '@domains/projects/infra/http/routes/projects.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/navers', naversRouter);
routes.use('/projects', projectsRouter);

export { routes };
