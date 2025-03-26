import { Debt } from "../types";

export const getFilteredDebts = async (phrase: string): Promise<Debt[]> => {
  if (phrase.length < 3) {
    throw new Error('Filter phrase must be at least 3 characters');
  }

  const response = await fetch('https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetFilteredDebts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phrase }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch filtered debts');
  }

  return response.json();
};