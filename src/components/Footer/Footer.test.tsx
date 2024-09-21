import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders footer text', () => {
  render(<Footer />);
  const footerElement = screen.getByText(/© 2024 Lorem Ipsum is simply dummy text of the printing and typesetting industry./i);
  expect(footerElement).toBeInTheDocument();
});