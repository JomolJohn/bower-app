import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Content from './Content';
import { STATIC_TEXT } from '../../constants/constants';

// Mock child components
jest.mock('../Module/ModuleSearch', () => () => <div>ModuleSearch Component</div>);
jest.mock('../Footer/Footer', () => () => <div>Footer Component</div>);
jest.mock('./StaticContent', () => ({ paragraphs }: { paragraphs: string[] }) => (
  <div>
    {paragraphs.map((text, index) => (
      <p key={index}>{text}</p>
    ))}
  </div>
));

describe('Content Component', () => {
  it('should render ModuleSearch component when on home page ("/")', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Content />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if ModuleSearch component is rendered
    expect(screen.getByText('ModuleSearch Component')).toBeInTheDocument();
  });

  it('should render StaticContent component when not on home page', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<Content />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if StaticContent component is rendered with STATIC_TEXT content
    STATIC_TEXT.forEach((text) => {
        const elements = screen.getAllByText(text);
        expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('should always render Footer component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Content />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if Footer component is rendered
    expect(screen.getByText('Footer Component')).toBeInTheDocument();
  });
});
