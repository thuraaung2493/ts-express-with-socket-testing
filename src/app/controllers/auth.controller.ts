import UserDto from '@app/dtos/user.dto.js';
import Status from '@app/enums/status.enum.js';
import AutoBind from '@decorators/autoBind.js';
import userRepository from '@repositories/user.repository.js';
import Hash from '@services/hash.service.js';
import JsonWebToken from '@services/jsonWebToken.service.js';
import { type Request, type Response } from 'express';

@AutoBind
class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await userRepository.create({
        name,
        email,
        password: await Hash.make(password),
      });

      return res.json({
        status: Status.OK,
        message: 'Register success.',
        data: { user: UserDto.fromModel(user!) },
      });
    } catch (e) {
      console.log('User create failed!', e);
      if (e instanceof Error)
        return res.json({
          status: Status.INTERNAL_SERVER_ERROR,
          message: e.message,
        });
    }
  }

  async login(req: Request, res: Response) {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await userRepository.first({ email });

    if (!user) {
      return res.json({
        status: Status.UNPROCESSABLE_CONTENT,
        message: 'Email is invalid',
      });
    }

    const isCheck = await Hash.check(password, user.password!);

    if (isCheck) {
      return res.json({
        message: 'Login was successful.',
        status: Status.OK,
        data: {
          user: UserDto.fromModel(user),
          token: await JsonWebToken.create(user),
        },
      });
    }

    return res.json({
      message: 'Login failed.',
      status: Status.UNAUTHORIZED,
    });
  }

  async verify(req: Request, res: Response) {
    return res.json({
      status: Status.OK,
      message: 'Token was verified',
      user: UserDto.fromModel(req.user!),
    });
  }
}

export default new AuthController();
