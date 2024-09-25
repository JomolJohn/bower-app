import { useLocation } from 'react-router-dom';
import ModuleSearch  from '../Module/ModuleSearch';
import Footer from '../Footer/Footer';
import StaticContent from './StaticContent';
import { STATIC_TEXT } from '../../constants/constants';
import './Content.css';

const Content = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';    

    return (
        <main className="main-content">
            {isHomePage ? (
                <ModuleSearch />
            ) : (
                <StaticContent paragraphs={STATIC_TEXT} />
            )}            
            <Footer />
        </main>
    );
};
  
export default Content;
