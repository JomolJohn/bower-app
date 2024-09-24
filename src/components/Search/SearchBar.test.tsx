import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('should render the input field', () => {
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  it('should update the input value as the user types', () => {
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    
    // Simulate typing
    fireEvent.change(inputElement, { target: { value: 'React' } });

    // Ensure the input value is updated
    expect(inputElement).toHaveValue('React');
  });

  it('should call onSearch with debounced query after 1 second', async () => {
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    
    // Simulate typing
    fireEvent.change(inputElement, { target: { value: 'React' } });

    // Wait for 1 second (debounce delay) and check if onSearch was called with the correct value
    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith('React'), { timeout: 1100 });
  });

  it('should not call onSearch until debounce period is over', async () => {
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search...');

    // Simulate typing
    fireEvent.change(inputElement, { target: { value: 'Debounce Test' } });

    // Reset mock function to ignore any initial calls made during component mount
    mockOnSearch.mockClear();

    // Check that onSearch hasn't been called immediately after input change
    expect(mockOnSearch).not.toHaveBeenCalled();

    // Wait for the debounce to finish (1 second)
    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith('Debounce Test'), { timeout: 1100 });
  });
});
