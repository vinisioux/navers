import { Router } from 'express';

import { ProjectsController } from '@domains/projects/infra/http/controllers/ProjectsController';
import { ensureAuthenticated } from '@domains/users/infra/http/middlewares/ensureAuthenticated';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.post('/', ensureAuthenticated, projectsController.store);

projectsRouter.get('/', ensureAuthenticated, projectsController.index);

projectsRouter.get(
  '/:project_id',
  ensureAuthenticated,
  projectsController.show
);

projectsRouter.put(
  '/:project_id',
  ensureAuthenticated,
  projectsController.update
);

projectsRouter.delete(
  '/:project_id',
  ensureAuthenticated,
  projectsController.delete
);

export { projectsRouter };
