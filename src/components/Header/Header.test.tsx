import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { TITLE_TEXT, TITLE_SUB_TEXT, NOTIFICATION_TEXT } from '../../constants/constants';

describe('Header Component', () => {
    it('should render the logo', () => {
      render(
        <Router>
          <Header />
        </Router>
      );
      const logo = screen.getByAltText(/logo/i);
      expect(logo).toBeInTheDocument();
    });
  
    it('should display the correct page title', () => {
      render(
        <Router>
          <Header />
        </Router>
      );
      const title = screen.getByText(TITLE_TEXT);
      expect(title).toBeInTheDocument();
    });
  
    it('should render the subtitle with a link to libraries.io', () => {
      render(
        <Router>
          <Header />
        </Router>
      );
      const subtitle = screen.getByText(TITLE_SUB_TEXT);
      expect(subtitle).toBeInTheDocument();
      const link = screen.getByRole('link', { name: /libraries.io/i });
      expect(link).toHaveAttribute('href', 'https://libraries.io/');
    });
  
    it('should render the Notification component with the correct text', () => {
        render(
          <Router>
            <Header />
          </Router>
        );
        const notificationText = screen.getByText(NOTIFICATION_TEXT);
        expect(notificationText).toBeInTheDocument();
    });
});
