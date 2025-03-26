import { Debt } from '../types';

export const getTopDebts = async (): Promise<Debt[]> => {
  const response = await fetch('https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts');
  if (!response.ok) {
    throw new Error('Failed to fetch top debts');
  }
  return response.json();
};




