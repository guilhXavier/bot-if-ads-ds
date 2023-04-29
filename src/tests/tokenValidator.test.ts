import { describe, it, expect } from 'vitest';
import { isTokenExpiredFromTime } from '../validators/tokenValidator';

describe('Token Validator Test Suite', () => {
  it('Should verify that a token has expired after an hour', () => {
    const createdAtTest = new Date(0);
    createdAtTest.setHours(createdAtTest.getHours() - 2);

    const result = isTokenExpiredFromTime(createdAtTest);

    expect(result).toBeFalsy();
  });

  it('should pass a token that has not expired from time', () => {
    const createdAtTest = new Date();

    const result = isTokenExpiredFromTime(createdAtTest);

    expect(result).toBeTruthy();
  });
});
