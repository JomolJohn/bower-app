import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';
import { SIDEBAR_TEXT, MENU_LINKS } from '../../constants/constants';
import useMobile from '../../hooks/useMobile ';

// Mock the useMobile hook
jest.mock('../../hooks/useMobile ');

describe('Sidebar Component', () => {
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
});