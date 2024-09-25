import { render, screen, fireEvent } from '@testing-library/react';
import ModuleList from './ModuleList';
import { Module } from '../types/type';
import { LOADING_TEXT, ERROR_TEXT } from '../../constants/constants';

describe('ModuleList', () => {
    const mockOnSort = jest.fn();

    const mockModules: Module[] = [
        { name: 'Module A', description: 'Description A', repository_url: '', homepage: '', stars: 3 },
        { name: 'Module B', description: 'Description B', repository_url: '', homepage: '', stars: 5 },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should renders loading state', () => {
        render(
          <ModuleList
            modules={[]}
            sortOrder="asc"
            onSort={mockOnSort}
            searchQuery=""
            loading={true}
            error={null}
          />
        );
    
        expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
    });

    it('should renders error message', () => {
        render(
          <ModuleList
            modules={[]}
            sortOrder="asc"
            onSort={mockOnSort}
            searchQuery=""
            loading={false}
            error={ERROR_TEXT}
          />
        );
    
        expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
    });

    it('should renders the list of modules ot loading or error', () => {
        render(
            <ModuleList 
                modules={mockModules} 
                sortOrder="asc" 
                onSort={mockOnSort} 
                searchQuery=""
                loading={false}
                error={null}
            />
        );

        // Check if the module names are rendered
        expect(screen.getByText('Module A')).toBeInTheDocument();
        expect(screen.getByText('Module B')).toBeInTheDocument();
    });

    it('should calls onSort when the sort link is clicked', () => {
        render(
            <ModuleList 
                modules={mockModules} 
                sortOrder="asc" 
                onSort={mockOnSort} 
                searchQuery=""
                loading={false}
                error={null}
            />
        );

        const sortLink = screen.getByText('Stars');
        fireEvent.click(sortLink);

        // Check if onSort was called with correct parameters
        expect(mockOnSort).toHaveBeenCalledWith('stars', 'desc');
    });

});