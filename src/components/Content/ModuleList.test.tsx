import { render } from '@testing-library/react';
import ModuleList from './ModuleList';

describe('ModuleList Component', () => {
    const modules = [
        {
            name: 'vue',
            description: 'This is the repo for Vue 2. For Vue 3, go to https://github.com/vuejs/core',
            repository_url: 'https://github.com/vuejs/vue.git',
            stars: 207652,
        },
        {
            name: 'axios',
            description: 'Promise based HTTP client for the browser and node.js',
            repository_url: 'https://github.com/mzabriskie/axios.git',
            stars: 105165,
        },
    ];

    let mockOnSearch: jest.Mock;

    beforeEach(() => {
        mockOnSearch = jest.fn();
    });

    test('renders correctly with provided modules', () => {
        const { getByText } = render(<ModuleList modules={modules} sortOrder='asc' onSort={mockOnSearch} />);

        // Check if the module names are rendered
        expect(getByText('vue')).toBeInTheDocument();
        expect(getByText('axios')).toBeInTheDocument();

        // Check if the module descriptions are rendered
        expect(getByText('This is the repo for Vue 2. For Vue 3, go to https://github.com/vuejs/core')).toBeInTheDocument();
        expect(getByText('Promise based HTTP client for the browser and node.js')).toBeInTheDocument();

        // Check if the owners are rendered
        expect(getByText('vuejs')).toBeInTheDocument();
        expect(getByText('mzabriskie')).toBeInTheDocument();

        // Check if the stars are rendered
        expect(getByText('207652')).toBeInTheDocument();
        expect(getByText('105165')).toBeInTheDocument();
    });

    test('renders empty table when no modules are provided', () => {
        const { getByText } = render(<ModuleList modules={[]} sortOrder='asc' onSort={mockOnSearch} />);

        // Check if the header is rendered
        expect(getByText('Name')).toBeInTheDocument();
        expect(getByText('Owner')).toBeInTheDocument();
        expect(getByText('Stars')).toBeInTheDocument();
    });
});