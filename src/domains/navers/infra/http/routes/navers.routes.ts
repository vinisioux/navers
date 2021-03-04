import { Router } from 'express';

import { NaversController } from '@domains/navers/infra/http/controllers/NaversController';
import { ensureAuthenticated } from '@domains/users/infra/http/middlewares/ensureAuthenticated';

const naversRouter = Router();

const naversController = new NaversController();

naversRouter.post('/', ensureAuthenticated, naversController.store);
naversRouter.get('/', ensureAuthenticated, naversController.index);
naversRouter.get('/:naver_id', ensureAuthenticated, naversController.show);
naversRouter.put('/:naver_id', ensureAuthenticated, naversController.update);
naversRouter.delete('/:naver_id', ensureAuthenticated, naversController.delete);

export { naversRouter };
