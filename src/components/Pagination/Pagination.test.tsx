import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('should render the correct number of page buttons when totalPages is less than 10', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={mockOnPageChange} />);

    // Expect "Previous" and "Next" buttons
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();

    // Expect 5 page number buttons
    const pageButtons = screen.getAllByRole('button', { name: /^[1-5]$/ });
    expect(pageButtons.length).toBe(5);
  });

  it('should disable "Previous" button on the first page', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('should disable "Next" button on the last page', () => {
    render(<Pagination totalPages={5} currentPage={5} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange with the correct page when a page button is clicked', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={mockOnPageChange} />);

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should show ellipsis when totalPages is greater than 10', () => {
    render(<Pagination totalPages={20} currentPage={10} onPageChange={mockOnPageChange} />);

    // Expect to see ellipsis
    expect(screen.getAllByText('...').length).toBe(2); // Two ellipses, one before and one after
  });

  it('should render correct pages near the current page when totalPages is greater than 10', () => {
    render(<Pagination totalPages={20} currentPage={10} onPageChange={mockOnPageChange} />);

    // Check that the first page, last page, and current surrounding pages are shown
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('should call onPageChange when clicking "Next" and "Previous"', () => {
    render(<Pagination totalPages={5} currentPage={3} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');

    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
});
