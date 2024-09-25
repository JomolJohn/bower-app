import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModuleSearch from './ModuleSearch';
import { searchModules } from '../../services/api';
import { LOADING_TEXT, ERROR_TEXT } from '../../constants/constants';

// Mock the searchModules function
jest.mock('../../services/api', () => ({
    searchModules: jest.fn(),
}));

describe('ModuleSearch', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks
    });

    it('should renders SearchBar and ModuleList', () => {
        render(<ModuleSearch />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
    });

    it('should fetches modules and displays them with pagination', async () => {
        // Mock the API response
        (searchModules as jest.Mock).mockResolvedValue({
            data: [{ name: 'Module A', description: 'Description A', repository_url: '', homepage: '', stars: 3 },],
            headers: {
                total: '1',
            },
        });

        const { container } = render(<ModuleSearch />);
        
        // Wait for the loading state to finish
        await waitFor(() => expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument());

        // Check if the ModuleList is rendered
        expect(screen.getByText('Module A')).toBeInTheDocument();
        expect(screen.queryByText(ERROR_TEXT)).not.toBeInTheDocument();
        const pagination = container.querySelector('.pagination');
        expect(pagination).toBeInTheDocument();
    });

    it('should handles errors when fetching modules', async () => {
        // Mock an error response
        (searchModules as jest.Mock).mockRejectedValue(new Error(ERROR_TEXT));

        const { container } = render(<ModuleSearch />);
        
        // Wait for the loading state to finish
        await waitFor(() => expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument());

        // Check if the error message is displayed
        expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
        const pagination = container.querySelector('.pagination');
        expect(pagination).not.toBeInTheDocument();
    });

    it('should updates search query and fetches modules accordingly', async () => {
        // Mock the API response for search
        (searchModules as jest.Mock).mockResolvedValueOnce({
            data: [{ name: 'Search Result Module', description: 'Description Search', repository_url: '', homepage: '', stars: 3 }],
            headers: {
                total: '1',
            },
        });

        render(<ModuleSearch />);
        
        // Simulate a search
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Search' } });
        fireEvent.keyPress(screen.getByRole('textbox'), { key: 'Enter', code: 13 });

        // Wait for the loading state to finish
        await waitFor(() => expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument());

        // Check if the ModuleList displays the search result
        expect(screen.getByText('Search Result Module')).toBeInTheDocument();
    });

    it('should handles pagination', async () => {
        // Mock the API response for multiple pages
        (searchModules as jest.Mock).mockResolvedValueOnce({
            data: [{ name: 'Module A', description: 'Description A', repository_url: '', homepage: '', stars: 3 },],
            headers: {
                total: '10',
            },
        });

        render(<ModuleSearch />);
        
        // Wait for the loading state to finish
        await waitFor(() => expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument());

        expect(screen.getByText('Module A')).toBeInTheDocument();

        // Check for pagination
        expect(screen.getByText(1)).toBeInTheDocument();
        expect(screen.getByText(2)).toBeInTheDocument();

        // Mock the API response for the second page
        (searchModules as jest.Mock).mockResolvedValueOnce({
            data: [{ name: 'Module B', description: 'Description B', repository_url: '', homepage: '', stars: 5 }],
            headers: {
                total: '10',
            },
        });

        // page click to go to the second page
        fireEvent.click(screen.getByText(2));

        // Wait for the loading state to finish
        await waitFor(() => expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument());

        // Check if the ModuleList displays the next module
        expect(await screen.findByText('Module B')).toBeInTheDocument();
    });
});
