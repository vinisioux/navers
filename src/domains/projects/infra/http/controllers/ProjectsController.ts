import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateProjectService } from '@domains/projects/services/CreateProjectService';
import { GetAllProjectsService } from '@domains/projects/services/GetAllProjectsService';
import { GetOneProjectService } from '@domains/projects/services/GetOneProjectService';
import { UpdateProjectService } from '@domains/projects/services/UpdateProjectService';
import { DeleteProjectService } from '@domains/projects/services/DeleteProjectService';

export class ProjectsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, navers } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      name,
      navers,
      created_by_id: Number(request.user.id),
    });

    return response.status(200).json(classToClass(project));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const getAllProjects = container.resolve(GetAllProjectsService);

    const projects = await getAllProjects.execute();

    return response.status(200).json(classToClass(projects));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.params;

    const getOneProject = container.resolve(GetOneProjectService);

    const project = await getOneProject.execute({
      project_id: Number(project_id),
    });

    return response.status(200).json(classToClass(project));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.params;
    const { name, navers } = request.body;

    const updateProject = container.resolve(UpdateProjectService);

    const project = await updateProject.execute({
      project_id: Number(project_id),
      created_by_id: Number(request.user.id),
      name,
      navers,
    });

    return response.status(200).json(classToClass(project));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.params;

    const deleteProject = container.resolve(DeleteProjectService);

    await deleteProject.execute({
      project_id: Number(project_id),
      created_by_id: Number(request.user.id),
    });

    return response
      .status(200)
      .json({ message: 'Project deleted with success!' });
  }
}
