import { describe, expect, it } from 'vitest';
import { studentNameFormatter } from '../../formatters/studentName';

describe('Student Name Formatter Test Suite', () => {
  it('should properly abbreviate a students name', () => {
    const testInput = 'Joao Pedro Maria Jose';

    const expectedResult = 'Joao P. M. Jose';

    const actualResult = studentNameFormatter(testInput);

    expect(actualResult).toEqual(expectedResult);
  });
});
