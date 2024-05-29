import { errorMessages } from '@/constants';

import { validateISIN } from '../formUtils';

describe('formUtils', () => {
  it('ValidateISIN return true for a correct ISIN', () => {
    expect(validateISIN('DE000BASF111', [])).toBeTruthy();
  });

  it('ValidateISIN returns error for an invalid ISIN', () => {
    expect(validateISIN('111', [])).toBe(errorMessages.invalidISIN);
  });

  it('ValidateISIN returns message for an existing subscription', () => {
    expect(validateISIN('DE000BASF111', ['DE000BASF111'])).toBe(
      errorMessages.existingISIN,
    );
  });
});
