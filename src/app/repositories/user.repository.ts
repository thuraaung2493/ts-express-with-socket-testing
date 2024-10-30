import { Prisma, PrismaClient } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  type DefaultArgs,
} from '@prisma/client/runtime/library';

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

class UserRepository {
  private user: Prisma.UserDelegate<DefaultArgs>;

  constructor() {
    const prisma = new PrismaClient();
    this.user = prisma.user;
  }

  async create(data: CreateUserPayload) {
    try {
      return await this.user.create({ data });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('A new user cannot be created with this email');
        }
      } else {
        throw new Error('Something went wrong!');
      }
    }
  }

  async first(where: { name?: string; email?: string }) {
    return this.user.findFirst({ where });
  }

  async all({ withoutId }: { withoutId: number }) {
    return this.user.findMany({ where: { NOT: { id: withoutId } } });
  }
}

export default new UserRepository();
