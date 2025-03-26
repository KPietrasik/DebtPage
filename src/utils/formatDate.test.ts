import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format the date correctly from ISO string', () => {
    const date = '2017-04-22T00:00:00';
    expect(formatDate(date)).toBe('22-04-2017');
  });

  it('should add leading zeros to day and month', () => {
    const date = '2020-09-01T00:00:00';
    expect(formatDate(date)).toBe('01-09-2020');
  });

  it('should handle invalid date', () => {
    const date = 'invalid-date';
    expect(formatDate(date)).toBe('NaN-NaN-NaN');
  });
});
