import { formatAmount } from './formatAmount';

describe('formatAmount', () => {
  it('should format the number with correct currency symbol', () => {
    const amount = 30000;
    expect(formatAmount(amount)).toEqual('30 000 zł');
  });

  it('should format small amounts correctly', () => {
    const amount = 1000;
    expect(formatAmount(amount)).toEqual('1000 zł');
  });

  it('should handle zero correctly', () => {
    const amount = 0;
    expect(formatAmount(amount)).toEqual('0 zł');
  });

  it('should handle negative values', () => {
    const amount = -1000;
    expect(formatAmount(amount)).toEqual('-1000 zł');
  });

  it('should handle large amounts correctly', () => {
    const amount = 1000000;
    const expected = '1 000 000 zł';
    const result = formatAmount(amount);

    expect(result.replace(/\u00A0/g, ' ')).toEqual(expected);
  });
});