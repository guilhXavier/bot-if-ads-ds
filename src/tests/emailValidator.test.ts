import { describe, expect, it } from 'vitest';
import { emailValidator } from '../validators/emailValidator';

describe('Email Validator Test Suite', () => {
  it('should validate an email if properly formatted', () => {
    const input = 'email@academico.ifsul.edu.br';

    const result = emailValidator(input);

    expect(result).toBeTruthy();
  });

  it('should fail to validate an email with the wrong domain', () => {
    const input = 'email@edu.br';

    const result = emailValidator(input);

    expect(result).toBeFalsy();
  });

  it('should remove whitespace from an email', () => {
    const input = 'email     @academico.ifsul.edu.br';

    const result = emailValidator(input);

    expect(result).toBeTruthy();
  });
});
