import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateProjectService } from '@domains/projects/services/CreateProjectService';

export class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, navers } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const user = await createProject.execute({
      name,
      navers,
      created_by_id: Number(request.user.id),
    });

    return response.status(200).json(classToClass(user));
  }
}
