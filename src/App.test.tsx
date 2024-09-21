import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Header/Header', () => () => <div>Mocked Header</div>);
jest.mock('./components/Footer/Footer', () => () => <div>Mocked Footer</div>);
jest.mock('./components/Sidebar/Sidebar', () => () => <div>Mocked Sidebar</div>);
jest.mock('./components/Content/Content', () => () => <div>Mocked Content</div>);

describe('App Component', () => {
  it('renders the layout correctly with Header, Sidebar, Content, and Footer', () => {
    render(<App />);
  });

  // Check that Header is rendered
  expect(screen.getByText(/Mocked Header/i)).toBeInTheDocument();

  // Check that Sidebar is rendered
  expect(screen.getByText(/Mocked Sidebar/i)).toBeInTheDocument();

  // Check that Content is rendered
  expect(screen.getByText(/Mocked Content/i)).toBeInTheDocument();

  // Check that Footer is rendered
  expect(screen.getByText(/Mocked Footer/i)).toBeInTheDocument();
});
