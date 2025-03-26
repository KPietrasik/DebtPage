import { getFilteredDebts } from './getFilteredDebts';

global.fetch = jest.fn();

describe('getFilteredDebts', () => {
  it('should fetch filtered debts successfully', async () => {
    const mockDebts = [
      { Id: 1, Number: 'DI/KOSZT/P/138483', Name: 'Marcin Szymczak', Value: 10000.0, NIP: '1234567890' },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDebts,
    });

    const result = await getFilteredDebts('Marcin');
    expect(result).toEqual(mockDebts);
  });

  it('should throw an error if the filter phrase is too short', async () => {
    await expect(getFilteredDebts('aa')).rejects.toThrow('Filter phrase must be at least 3 characters');
  });

  it('should throw an error if fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await expect(getFilteredDebts('Marcin')).rejects.toThrow('Failed to fetch filtered debts');
  });
});
