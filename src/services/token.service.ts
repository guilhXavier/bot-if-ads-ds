import crypto from 'node:crypto';
import { Token } from '@prisma/client';
import { TokenRepository } from '../repository/Token.repository';
import { isTokenExpiredFromTime } from '../validators/tokenValidator';

interface TokenValidation {
  token?: Token;
  isValid: boolean;
}

export class TokenService {
  constructor(private readonly repository: TokenRepository) {}

  private generateTokenCode(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private async getTokenByCode(tokenCode: string): Promise<Token> {
    return this.repository.findByCode(tokenCode);
  }

  public async createToken(enrollmentId: string): Promise<string> {
    const newToken = this.generateTokenCode();
    await this.repository.save(newToken, enrollmentId);

    return newToken;
  }

  public async expireToken(tokenCode: string): Promise<void> {
    const token = await this.getTokenByCode(tokenCode);

    this.repository.update({ ...token, isExpired: true });
  }

  public async isValidToken(
    proposedTokenCode: string
  ): Promise<TokenValidation> {
    try {
      const token = await this.getTokenByCode(proposedTokenCode);

      if (isTokenExpiredFromTime(token.createdAt)) {
        // this.expireToken(token.tokenCode);
        return { token, isValid: false };
      }

      if (token.isExpired) {
        return { token, isValid: false };
      }

      // this.expireToken(token.tokenCode);

      return { token, isValid: true };
    } catch (err) {
      return { token: null, isValid: false };
    }
  }
}
