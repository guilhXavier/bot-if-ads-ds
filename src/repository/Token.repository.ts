import { PrismaClient, Token } from '@prisma/client';

export class TokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async save(tokenCode: string): Promise<Token> {
    return await this.prisma.token.create({ data: { tokenCode } });
  }

  public async findByCode(tokenCode: string): Promise<Token> {
    return await this.prisma.token.findUnique({ where: { tokenCode } });
  }

  public async update(newToken: Token): Promise<void> {
    await this.prisma.token.update({
      where: { id: newToken.id },
      data: newToken,
    });
  }
}