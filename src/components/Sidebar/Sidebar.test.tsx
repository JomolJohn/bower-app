import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { SIDEBAR_TEXT, MENU_LINKS } from '../../constants/constants';
import useMobile from '../../hooks/useMobile ';

// Mock the useMobile hook and react router functions
jest.mock('../../hooks/useMobile ', () => jest.fn());
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('Sidebar Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useMobile as jest.Mock).mockReturnValue(false); // Default to desktop (not mobile)
    
    // Mock useLocation to simulate being on the home page
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/', // Simulating being on the home page
    });

    // Mock useNavigate
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it('should render the menu links correctly', () => {
    // Mock useMobile to return false (desktop view)
    (useMobile as jest.Mock).mockReturnValue(false);

    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Check if all links are rendered
    MENU_LINKS.forEach((link) => {
      const menuItem = screen.getByText(link.name);
      expect(menuItem).toBeInTheDocument();
      expect(menuItem.closest('a')).toHaveAttribute('href', link.path);
    });
  });

  it('should render sidebar text correctly', () => {
    // Mock useMobile to return false (desktop view)
    (useMobile as jest.Mock).mockReturnValue(false);

    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Check if all sidebar texts are rendered
    SIDEBAR_TEXT.forEach((text) => {
        const elements = screen.getAllByText(text);
        expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('should hide the menu on mobile when menu is hidden', () => {
    // Mock useMobile to return true (mobile view)
    (useMobile as jest.Mock).mockReturnValue(true);

    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Check that the menu is hidden on mobile
    const hiddenMenu = screen.getByRole('list');
    expect(hiddenMenu.closest('div')).toHaveClass('hidden-xs');
  });

  it('should toggle the menu visibility when clicking the menu button on mobile', () => {
    // Mock useMobile to return true (mobile view)
    (useMobile as jest.Mock).mockReturnValue(true);

    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Find and click the menu button
    const menuButton = screen.getByText('Menu');
    fireEvent.click(menuButton);

    const visibleMenu = screen.getByRole('list');
    expect(visibleMenu.closest('div')).not.toHaveClass('hidden-xs');
  });

  it('should reloads the page when "Home" is clicked if already on the home page', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const homeLink = screen.getByText(MENU_LINKS[0].name);

    // Simulate clicking the "Home" link
    fireEvent.click(homeLink);

    // Check if navigate(0) was called to reload the page
    expect(mockNavigate).toHaveBeenCalledWith(0);
  });

  it('should not reload the page when clicking on non-home links', () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/about',
    });

    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Simulate clicking on a non-home link
    const nonHomeLink = screen.getByText(MENU_LINKS[1].name);
    fireEvent.click(nonHomeLink);

    // Ensure that navigate(0) is not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  
});