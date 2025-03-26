import { getTopDebts } from './getTopDebts';

global.fetch = jest.fn();

describe('getTopDebts', () => {
  it('should fetch top debts successfully', async () => {
    const mockDebts = [
      { Id: 1, Number: 'DI/KOSZT/P/138483', Name: 'Marcin Szymczak', Value: 10000.0, NIP: '1234567890' },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDebts,
    });

    const result = await getTopDebts();
    expect(result).toEqual(mockDebts);
  });

  it('should throw an error if fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await expect(getTopDebts()).rejects.toThrow('Failed to fetch top debts');
  });
});
