import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateNaverService } from '@domains/navers/services/CreateNaverService';
import { GetAllNaversService } from '@domains/navers/services/GetAllNaversService';
import { GetOneNaverService } from '@domains/navers/services/GetOneNaverService';
import { UpdateNaverService } from '@domains/navers/services/UpdateNaverService';
import { DeleteNaverService } from '@domains/navers/services/DeleteNaverService';

export class NaversController {
  public async store(request: Request, response: Response): Promise<Response> {
    const {
      name,
      admission_date,
      birthdate,
      job_role,
      projects,
    } = request.body;

    const createNaver = container.resolve(CreateNaverService);

    const naver = await createNaver.execute({
      name,
      admission_date,
      birthdate,
      job_role,
      projects,
      created_by_id: Number(request.user.id),
    });

    return response.status(200).json(classToClass(naver));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const getAllNavers = container.resolve(GetAllNaversService);

    const navers = await getAllNavers.execute();

    return response.status(200).json(classToClass(navers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { naver_id } = request.params;

    const getOneNaver = container.resolve(GetOneNaverService);

    const naver = await getOneNaver.execute({ naver_id: Number(naver_id) });

    return response.status(200).json(classToClass(naver));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { naver_id } = request.params;
    const {
      name,
      admission_date,
      birthdate,
      job_role,
      projects,
    } = request.body;

    const updateNaver = container.resolve(UpdateNaverService);

    const naver = await updateNaver.execute({
      admission_date,
      birthdate,
      created_by_id: Number(request.user.id),
      job_role,
      name,
      naver_id: Number(naver_id),
      projects,
    });

    return response.status(200).json(classToClass(naver));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { naver_id } = request.params;

    const deleteNaver = container.resolve(DeleteNaverService);

    await deleteNaver.execute({
      created_by_id: Number(request.user.id),
      naver_id: Number(naver_id),
    });

    return response
      .status(200)
      .json({ message: 'Naver deleted with success.' });
  }
}
