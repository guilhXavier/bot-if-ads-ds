import { describe, expect, it } from 'vitest';
import { emailValidator } from '../../validators/emailValidator';

describe('Email Validator Test Suite', () => {
  it('should validate an email if properly formatted', async () => {
    const input = 'email@academico.ifsul.edu.br';

    const result = await emailValidator(input);

    expect(result).toBeTruthy();
  });

  it('should fail to validate an email with the wrong domain', async () => {
    const input = 'email@edu.br';

    const result = await emailValidator(input);

    expect(result).toBeFalsy();
  });

  it('should fail to validate an input which is empty', async () => {
    const input = '';

    const result = await emailValidator(input);

    expect(result).toBeFalsy();
  });

  it('should fail to validate an input which is not an email', async () => {
    const input = 'asdasdasd';

    const result = await emailValidator(input);

    expect(result).toBeFalsy();
  });
});
