import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { FOOTER_TEXT } from '../../constants/constants';

describe('Footer', () => {
    it('renders all footer text', () => {
        render(<Footer />);

        FOOTER_TEXT.forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });
});