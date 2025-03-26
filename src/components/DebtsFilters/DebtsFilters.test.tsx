import { render, screen, fireEvent } from '@testing-library/react';
import DebtsFilters from './DebtsFilters';

describe('DebtsFilters', () => {
  it('should call onFilterChange when the input value changes', () => {
    const mockOnFilterChange = jest.fn();
    render(<DebtsFilters onFilterChange={mockOnFilterChange} onFilterReset={() => {}}  />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '1234567890' } });

    const filterButton = screen.getByRole('button');
    fireEvent.click(filterButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith('1234567890');
  });
});
