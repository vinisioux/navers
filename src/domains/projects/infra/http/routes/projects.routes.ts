import { Router } from 'express';

import { ProjectsController } from '@domains/projects/infra/http/controllers/ProjectsController';
import { ensureAuthenticated } from '@domains/users/infra/http/middlewares/ensureAuthenticated';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.post('/', ensureAuthenticated, projectsController.create);

export { projectsRouter };
