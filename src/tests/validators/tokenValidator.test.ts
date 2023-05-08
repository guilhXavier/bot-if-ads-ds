import { describe, it, expect } from 'vitest';
import { isTokenExpiredFromTime } from '../../validators/tokenValidator';

describe('Token Validator Test Suite', () => {
  it('should recognize an expired token', () => {
    const inputCreatedAt: Date = new Date(0);

    const result = isTokenExpiredFromTime(inputCreatedAt);

    expect(result).toBeTruthy();
  });

  it('should not fail a token that is not expired', () => {
    const inputCreatedAt: Date = new Date(Date.now());

    const result = isTokenExpiredFromTime(inputCreatedAt);

    expect(result).toBeFalsy();
  });
});
