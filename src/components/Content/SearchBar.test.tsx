import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
    let mockOnSearch: jest.Mock;

    beforeEach(() => {
        mockOnSearch = jest.fn();
    });

    test('renders correctly', () => {
        const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
        const input = getByPlaceholderText('Search...') as HTMLInputElement;;
        expect(input).toBeInTheDocument();
    });

    test('updates input value on change', () => {
        const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
        const input = getByPlaceholderText('Search...') as HTMLInputElement;;
        
        fireEvent.change(input, { target: { value: 'test' } });
        expect(input.value).toBe('test'); // Check if the input value is updated
    });

    test('calls onSearch with correct value after debounce', async () => {
        const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
        const input = getByPlaceholderText('Search...') as HTMLInputElement;;
        
        fireEvent.change(input, { target: { value: 'test' } });

        // Wait for the debounce time
        await waitFor(() => {
            expect(mockOnSearch).toHaveBeenCalledTimes(1); // Ensure onSearch is called once
            expect(mockOnSearch).toHaveBeenCalledWith('test'); // Check if it was called with 'test'
        });
    });

    test('does not call onSearch until debounce time has passed', async () => {
        const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
        const input = getByPlaceholderText('Search...') as HTMLInputElement;;
        
        fireEvent.change(input, { target: { value: 'test' } });
        expect(mockOnSearch).not.toHaveBeenCalled(); // Check that onSearch is not called immediately

        // Wait for the debounce time
        await waitFor(() => {
            expect(mockOnSearch).toHaveBeenCalledTimes(1);
        });
    });
});