import { render, screen } from '@testing-library/react';
import Notification from './Notification';
import { NOTIFICATION_TEXT } from '../../constants/constants';

describe('Notification Component', () => {
  it('should render the notification text from constants', () => {
    // Render the Notification component
    render(<Notification />);

    // Check if the notification text is in the document
    const notificationElement = screen.getByText(NOTIFICATION_TEXT);
    expect(notificationElement).toBeInTheDocument();
  });
});
