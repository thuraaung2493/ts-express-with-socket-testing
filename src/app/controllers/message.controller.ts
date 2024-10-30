import MessageDto from '@app/dtos/message.dto.js';
import UserDto from '@app/dtos/user.dto.js';
import Status from '@app/enums/status.enum.js';
import AutoBind from '@decorators/autoBind.js';
import messageRepository from '@repositories/message.repository.js';
import userRepository from '@repositories/user.repository.js';
import { type Request, type Response } from 'express';

@AutoBind
class MessageController {
  async getUserLists(req: Request, res: Response) {
    const user = req.user!;

    const users = await userRepository.all({ withoutId: user.id });

    return res.json({
      status: Status.OK,
      message: 'Success',
      users: users.map((user) => UserDto.fromModel(user)),
    });
  }

  async getConversactionLists(req: Request, res: Response) {
    const senderId = req.user!.id;
    const receiverId = req.params.id!;
    const messages = await messageRepository.getUserMessages(
      senderId,
      +receiverId
    );

    return res.json({
      status: Status.OK,
      message: 'Success',
      data: messages.map((msg) => MessageDto.fromModel(msg)),
    });
  }
}

export default new MessageController();
