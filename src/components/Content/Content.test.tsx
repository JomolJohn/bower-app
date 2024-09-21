import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from './Content';

test('renders content area text', () => {
  render(<Content />);
  const contentText = screen.getByText(/Main Content Area/i);
  expect(contentText).toBeInTheDocument();
});