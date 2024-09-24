import { FOOTER_TEXT } from '../../constants/constants';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <>
                {FOOTER_TEXT.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </>
        </footer>
      );
};
  
export default Footer;