import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateUserService } from '@domains/users/services/CreateUserService';

export class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
    });

    return response.status(200).json(classToClass(user));
  }
}
