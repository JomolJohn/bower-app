import { render, screen, fireEvent } from '@testing-library/react';
import ModuleList from './ModuleList';
import { Module } from '../type';

describe('ModuleList', () => {
    const mockOnSort = jest.fn();

    const mockModules: Module[] = [
        { name: 'Module A', description: 'Description A', repository_url: '', homepage: '', stars: 3 },
        { name: 'Module B', description: 'Description B', repository_url: '', homepage: '', stars: 5 },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the list of modules', () => {
        render(
            <ModuleList 
                modules={mockModules} 
                sortOrder="asc" 
                onSort={mockOnSort} 
                searchQuery=""
            />
        );

        // Check if the module names are rendered
        expect(screen.getByText('Module A')).toBeInTheDocument();
        expect(screen.getByText('Module B')).toBeInTheDocument();
    });

    test('calls onSort when the sort link is clicked', () => {
        render(
            <ModuleList 
                modules={mockModules} 
                sortOrder="asc" 
                onSort={mockOnSort} 
                searchQuery=""
            />
        );

        const sortLink = screen.getByText('Stars');
        fireEvent.click(sortLink);

        // Check if onSort was called with correct parameters
        expect(mockOnSort).toHaveBeenCalledWith('stars', 'desc');
    });

    test('displays the correct heading for the table', () => {
        render(
            <ModuleList 
                modules={mockModules} 
                sortOrder="asc" 
                onSort={mockOnSort} 
                searchQuery=""
            />
        );

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Owner')).toBeInTheDocument();
        expect(screen.getByText('Stars')).toBeInTheDocument();
    });
});