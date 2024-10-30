import type { User } from '@prisma/client';

export default class UserDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly profile: string,
    public readonly createdAt: string,
    public readonly updatedAt: string
  ) {}

  static fromModel(model: User): UserDto {
    return new UserDto(
      model.id,
      model.name,
      model.email,
      'https://via.placeholder.com/300x300.png/00ff11?text=minus',
      model.createdAt.toDateString(),
      model.updatedAt.toDateString()
    );
  }
}
