import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getFilteredDebts } from '../../services/getFilteredDebts';
import { getTopDebts } from '../../services/getTopDebts';
import DebtsPage from './DebtsPage';

jest.mock('../../services/getFilteredDebts');
jest.mock('../../services/getTopDebts');

describe('DebtsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loader while fetching data', () => {
    const queryClient = new QueryClient();
    (getTopDebts as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(
      <QueryClientProvider client={queryClient}>
        <DebtsPage />
      </QueryClientProvider>
    );

    expect(screen.getByTestId('loader-overlay')).toBeInTheDocument();
  });

  test('loads debts from backend', async () => {
    const queryClient = new QueryClient();
    const mockData = [
      { Id: 1, Name: 'Marcin Szymczak', Value: 10000, Date: '2017-03-01' },
      { Id: 2, Name: 'Anna Kowalska', Value: 5000, Date: '2018-01-15' },
    ];

    (getFilteredDebts as jest.Mock).mockResolvedValue(mockData);
    (getTopDebts as jest.Mock).mockResolvedValue(mockData);

    render(
      <QueryClientProvider client={queryClient}>
        <DebtsPage />
      </QueryClientProvider>
    );

    await screen.findByText('Marcin Szymczak');
    expect(screen.getByText('Anna Kowalska')).toBeInTheDocument();
  });


  test('filters debts based on input', async () => {
    const queryClient = new QueryClient();
    const mockData = [
      { Id: 1, Name: 'Marcin Szymczak', Value: 10000, Date: '2017-03-01' },
      { Id: 2, Name: 'Anna Kowalska', Value: 5000, Date: '2018-01-15' },
    ];

    const mockFilteredData = [
      { Id: 1, Name: 'Marcin Szymczak', Value: 10000, Date: '2017-03-01' },
    ];

    (getFilteredDebts as jest.Mock).mockResolvedValue(mockFilteredData);
    (getTopDebts as jest.Mock).mockResolvedValue(mockData);

    render(
      <QueryClientProvider client={queryClient}>
        <DebtsPage />
      </QueryClientProvider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Marcin' } });

    const filterButton = screen.getByRole('button');
    fireEvent.click(filterButton);

    await screen.findByText('Marcin Szymczak');
    expect(screen.queryByText('Anna Kowalska')).not.toBeInTheDocument();
  });

});