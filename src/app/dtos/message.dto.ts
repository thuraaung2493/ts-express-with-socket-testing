import type { Message, MessageStatus } from '@prisma/client';

export default class MessageDto {
  constructor(
    public readonly id: number,
    public readonly content: string | null,
    public readonly imageUrl: string | null,
    public readonly senderId: number,
    public readonly receiverId: number,
    public readonly status: MessageStatus,
    public readonly createdAt: string
  ) {}

  static fromModel(model: Message): MessageDto {
    return new MessageDto(
      model.id,
      model.content,
      model.imageUrl,
      model.senderId,
      model.receiverId,
      model.status,
      model.createdAt.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    );
  }
}
