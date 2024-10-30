import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

class MessageRepository {
  private message;
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
    this.message = this.prisma.message;
  }

  async findById(id: number) {
    return this.message.findUnique({ where: { id } });
  }

  async create(data: Prisma.MessageCreateInput) {
    try {
      return this.message.create({ data });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('A new message cannot be created');
        }
      } else {
        throw new Error('Something went wrong!');
      }
    }
  }

  async getUserMessages(senderId: number, receiverId: number) {
    return this.message.findMany({
      where: {
        AND: [
          { OR: [{ senderId: senderId }, { receiverId: senderId }] },
          { OR: [{ senderId: receiverId }, { receiverId: receiverId }] },
        ],
      },
    });
  }

  async update(
    id: number,
    data: Prisma.MessageUpdateInput,
    refresh: boolean = false
  ) {
    if (refresh) {
      const [updated] = await this.prisma.$transaction([
        this.message.update({
          where: { id: id },
          data: data,
        }),
        this.message.findUnique({
          where: { id },
        }),
      ]);

      return updated;
    }
    return this.message.update({
      where: { id: id },
      data: data,
    });
  }
}

export default new MessageRepository();
