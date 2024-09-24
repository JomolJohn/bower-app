import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'; 
import Notification from '../Notification/Notification';
import { TITLE_TEXT, TITLE_SUB_TEXT } from '../../constants/constants';
import './Header.css';

const Header = () => {
    return (
        <>
            <header className="header">
                <div className="container">
                    <Link to="/">
                        <img src={logo} className="logo" alt="logo" />
                    </Link>
                    <div className="text-container">
                        <h1 className="page-title">{TITLE_TEXT}</h1>
                        <h4 className="page-subtitle">{TITLE_SUB_TEXT} <a href="https://libraries.io/">libraries.io</a></h4>
                    </div>
                </div>
            </header>
            <Notification />
        </>        
      );
};
  
export default Header;
