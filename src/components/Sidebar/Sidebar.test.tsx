import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

test('renders sidebar list items', () => {
  render(<Sidebar />);
  const listItem = screen.getByText(/Home/i);
  expect(listItem).toBeInTheDocument();
});