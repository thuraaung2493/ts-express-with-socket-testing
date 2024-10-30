import AutoBind from '@decorators/autoBind.js';
import { MessageStatus } from '@prisma/client';
import messageRepository from '@repositories/message.repository.js';
import Logger from '@utils/logger.js';
import type { Server, Socket } from 'socket.io';

export interface SendMessage {
  msg: string;
  senderId: string;
  receiverId: string;
}

export interface MessageResponse {
  success: boolean;
  data?: {
    messageId: number;
    status: MessageStatus;
  };
  error?: string;
}

export type MessageCallback = (response: MessageResponse) => void;

@AutoBind
export default class MessagesHandler {
  constructor(private io: Server, private socket: Socket) {}

  join(userId: number) {
    Logger.info(`The user joined ${userId}-room`);
    this.socket.join(`${userId}-room`);
  }

  async sendMessage(data: SendMessage, callback: MessageCallback) {
    const { msg, senderId, receiverId } = data;

    try {
      let message = await messageRepository.create({
        content: msg,
        senderId: +senderId,
        receiverId: +receiverId,
        status: MessageStatus.SENDING,
      });

      callback({
        success: true,
        data: {
          messageId: message?.id!,
          status: MessageStatus.SENT,
        },
      });
      message = await messageRepository.update(
        message?.id!,
        {
          status: MessageStatus.SENT,
        },
        true
      );

      this.socket.to(`${receiverId}-room`).emit('messages:send-new', message);

      await messageRepository.update(message?.id!, {
        status: MessageStatus.DELIVERED,
      });

      this.socket.emit('messages:status-update', {
        messageId: message?.id,
        status: MessageStatus.DELIVERED,
      });
    } catch (e) {
      if (e instanceof Error) {
        Logger.error('Error saving private message:', e);
      }
    }
  }

  async viewMessage(data: { id: number }) {
    console.log(data);
    const id = data.id;

    await messageRepository.update(id, {
      status: MessageStatus.VIEWED,
    });

    const message = await messageRepository.findById(data.id);
    this.socket.to(`${message?.senderId}-room`).emit('messages:status-update', {
      messageId: id,
      status: MessageStatus.VIEWED,
    });
  }
}
