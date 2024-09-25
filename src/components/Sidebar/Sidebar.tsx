import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SIDEBAR_TEXT, MENU_LINKS, MOBILE_BREAKPOINT } from '../../constants/constants';
import useMobile from '../../hooks/useMobile ';
import './Sidebar.css';

const Sidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const isMobile = useMobile(MOBILE_BREAKPOINT);
    const [isMenuHide, setIsMenuHide] = useState<boolean>(true);

    const toggleMenu  = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setIsMenuHide(prevState => !prevState);
    };

    const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (location.pathname === "/") {
          event.preventDefault();
          navigate(0);
        }
    };

    return (
        <aside className="sidebar">
            <div className="btn menu-btn visible-xs" onClick={toggleMenu}>Menu</div>
            <div className={isMobile && isMenuHide ? 'hidden-xs' : ''}>
                <ul>
                    {MENU_LINKS.map((link, index) => (
                        <li key={index}>
                            <Link to={link.path} onClick={link.path === "/" ? handleHomeClick : undefined}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className='sidebar-text'>
                    {SIDEBAR_TEXT.map((text, index) => (
                        <p key={index}>{text}</p>
                    ))}
                </div>
            </div>
        </aside>
      );
};
  
export default Sidebar;