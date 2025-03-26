export function formatAmount(amount: number): string {
  const formattedAmount = Math.abs(amount).toLocaleString('pl-PL', { minimumFractionDigits: 0 });
  return `${amount < 0 ? '-' : ''}${formattedAmount} zł`;
}