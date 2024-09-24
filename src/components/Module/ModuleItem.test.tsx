import { render, screen } from '@testing-library/react';
import ModuleItem from './ModuleItem';
import { Module } from '../type';

// Mocking the react-icons to avoid dealing with actual icon rendering
jest.mock('react-icons/fa', () => ({
  FaHome: () => <div data-testid="home-icon" />
}));

const mockModule: Module = {
  name: 'TestModule',
  description: 'This is a test module description',
  homepage: 'https://testmodule.com',
  repository_url: 'https://github.com/testowner/testmodule',
  stars: 123
};

describe('ModuleItem Component', () => {
  it('should render module details correctly', () => {
    render(<ModuleItem module={mockModule} searchQuery="" />);

    // Check that the module name is rendered
    const moduleName = screen.getByText('TestModule');
    expect(moduleName).toBeInTheDocument();

    // Check that the module description is rendered
    const moduleDescription = screen.getByText('This is a test module description');
    expect(moduleDescription).toBeInTheDocument();

    // Check that the owner is rendered
    const ownerName = screen.getAllByText('testowner');
    expect(ownerName.length).toBeGreaterThan(0);

    // Check that the stars count is rendered
    const stars = screen.getAllByText('123');
    expect(stars.length).toBeGreaterThan(0);

    // Check that the homepage link is rendered
    const homepageLink = screen.getByText('https://testmodule.com');
    expect(homepageLink).toBeInTheDocument();

    // Check that the FaHome icon is rendered
    const homeIcon = screen.getByTestId('home-icon');
    expect(homeIcon).toBeInTheDocument();
  });

  it('should highlight the search query in the module name', () => {
    render(<ModuleItem module={mockModule} searchQuery="Test" />);

    // Check that the module name contains highlighted text
    const highlightedName = screen.getByText((content, element) => {
      return element?.tagName === 'MARK' && content === 'Test';
    });
    expect(highlightedName).toBeInTheDocument();
  });

  it('should highlight the search query in the module description', () => {
    const searchQuery = 'test';
    render(<ModuleItem module={mockModule} searchQuery={searchQuery} />);

    // Check that the module description contains highlighted text
    const highlightedDescriptions = screen.queryAllByText((content, element) => {
        return element?.tagName === 'MARK' && content.toLowerCase() === 'test' && content.length > 0;
    });
        
    expect(highlightedDescriptions.length).toBeGreaterThan(0);
  });

  it('should not highlight text if search query is empty', () => {
    render(<ModuleItem module={mockModule} searchQuery="" />);

    // Check that there is no highlighted text
    const markedElements = screen.queryAllByText((content, element) => {
      return element?.tagName === 'MARK' && content.length > 0;
    });
    expect(markedElements.length).toBe(0); // Expect no highlighted elements
  });
});
