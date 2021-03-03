import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateNaverService } from '@domains/navers/services/CreateNaverService';

export class NaversController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      admission_date,
      birthdate,
      job_role,
      projects,
    } = request.body;

    const createNaver = container.resolve(CreateNaverService);

    const user = await createNaver.execute({
      name,
      admission_date,
      birthdate,
      job_role,
      projects,
      created_by_id: Number(request.user.id),
    });

    return response.status(200).json(classToClass(user));
  }
}
