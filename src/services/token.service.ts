import crypto from 'node:crypto';
import { Token } from '@prisma/client';
import { TokenRepository } from '../repository/Token.repository';
import { isTokenExpiredFromTime } from '../validators/tokenValidator';

export class TokenService {
  constructor(private readonly repository: TokenRepository) {}

  private generateTokenCode(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private async getTokenByCode(tokenCode: string): Promise<Token> {
    return this.repository.findByCode(tokenCode);
  }

  public async createToken(): Promise<string> {
    const newToken = this.generateTokenCode();
    await this.repository.save(newToken);

    return newToken;
  }

  public async expireToken(tokenCode: string): Promise<void> {
    const token = await this.getTokenByCode(tokenCode);

    this.repository.update({ ...token, isExpired: true });
  }

  public async validateToken(proposedTokenCode: string): Promise<boolean> {
    try {
      const { tokenCode, isExpired, createdAt } = await this.getTokenByCode(
        proposedTokenCode
      );

      if (isTokenExpiredFromTime(createdAt)) {
        this.expireToken(tokenCode);
        return false;
      }

      if (isExpired) {
        return false;
      }

      this.expireToken(tokenCode);

      return true;
    } catch (err) {
      return false;
    }
  }
}
