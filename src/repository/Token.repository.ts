import { PrismaClient, Token } from '@prisma/client';

export class TokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async save(tokenCode: string, enrollmentId: string): Promise<Token> {
    return await this.prisma.token.create({
      data: { tokenCode, enrollmentId },
    });
  }

  public async findByCode(tokenCode: string): Promise<Token> {
    return await this.prisma.token.findUnique({ where: { tokenCode } });
  }

  public async update({
    createdAt,
    isExpired,
    tokenCode,
  }: Token): Promise<void> {
    await this.prisma.token.update({
      where: { tokenCode },
      data: { createdAt, isExpired, tokenCode },
    });
  }
}
