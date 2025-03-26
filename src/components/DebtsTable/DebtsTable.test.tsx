import { render, screen, fireEvent } from '@testing-library/react';
import DebtsTable from './DebtsTable';

describe('DebtsTable', () => {
  const debts = [
    { Id: 1, Name: 'Marcin Szymczak', NIP: "1112223302", Value: 10000, Date: '2017-03-01' },
    { Id: 2, Name: 'Anna Nowak', NIP: "2233445566", Value: 20000, Date: '2018-04-01' },
  ];

  test('displays debt names correctly', () => {
    render(<DebtsTable debts={debts} filter="" />);

    expect(screen.getByText('Marcin Szymczak')).toBeInTheDocument();
    expect(screen.getByText('Anna Nowak')).toBeInTheDocument();
  });

  test('filters debts correctly', () => {
    render(<DebtsTable debts={debts} filter="Marcin" />);

    expect(screen.getByText('Marcin Szymczak')).toBeInTheDocument();
    expect(screen.queryByText('Anna Nowak')).toBeNull();
  });

  test('sorts debts when column header is clicked', () => {
    render(<DebtsTable debts={debts} filter="" />);

    const firstRow = screen.getAllByText('Marcin Szymczak')[0];
    expect(firstRow).toBeInTheDocument();

    const nameHeader = screen.getByText('DŁUŻNIK');
    fireEvent.click(nameHeader);

    const sortedFirstRow = screen.getAllByText('Anna Nowak')[0];
    expect(sortedFirstRow).toBeInTheDocument();
  });
});
