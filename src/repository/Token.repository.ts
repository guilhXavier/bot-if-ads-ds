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

  public async findManyByEnrollementId(
    enrollmentId: string
  ): Promise<Array<Token>> {
    return await this.prisma.token.findMany({ where: { enrollmentId } });
  }

  public async update({
    createdAt,
    isExpired,
    tokenCode,
    status,
  }: Token): Promise<void> {
    await this.prisma.token.update({
      where: { tokenCode },
      data: { createdAt, isExpired, tokenCode, status },
    });
  }
}
