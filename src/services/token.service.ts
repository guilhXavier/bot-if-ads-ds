import crypto from 'node:crypto';
import { Token, TokenStatus } from '@prisma/client';
import { TokenRepository } from '../repository/Token.repository';
import { isTokenExpiredFromTime } from '../validators/tokenValidator';

interface TokenValidation {
  token?: Token;
  isValid: boolean;
}

export class TokenService {
  constructor(private readonly repository: TokenRepository) {}

  private generateTokenCode(): string {
    return crypto.randomBytes(8).toString('hex');
  }

  private async getTokensByEnrollmentId(
    enrollmentId: string
  ): Promise<Array<Token>> {
    return this.repository.findManyByEnrollementId(enrollmentId);
  }

  public async getTokenByCode(tokenCode: string): Promise<Token> {
    return this.repository.findByCode(tokenCode);
  }

  public async createToken(enrollmentId: string): Promise<string> {
    const newToken = this.generateTokenCode();
    await this.repository.save(newToken, enrollmentId);

    return newToken;
  }

  public async expireToken(
    tokenCode: string,
    status: TokenStatus
  ): Promise<void> {
    const token = await this.getTokenByCode(tokenCode);

    this.repository.update({ ...token, status, isExpired: true });
  }

  public async deleteAll(): Promise<void> {
    this.repository.deleteAll();
  }

  public async isValidToken(token: Token): Promise<TokenValidation> {
    try {
      const tokensWithSameEnrollmentId = await this.getTokensByEnrollmentId(
        token.enrollmentId
      );

      if (
        tokensWithSameEnrollmentId.length &&
        tokensWithSameEnrollmentId.find(
          (tokenElement: Token): boolean =>
            tokenElement.status === TokenStatus.SUCESS
        )
      ) {
        this.expireToken(token.tokenCode, TokenStatus.EXPIRED);
        return { token, isValid: false };
      }

      if (isTokenExpiredFromTime(token.createdAt)) {
        this.expireToken(token.tokenCode, TokenStatus.EXPIRED);
        return { token, isValid: false };
      }

      if (token.isExpired) {
        return { token, isValid: false };
      }

      this.expireToken(token.tokenCode, TokenStatus.SUCESS);

      return { token, isValid: true };
    } catch (err) {
      return { token: null, isValid: false };
    }
  }
}
