import './Header.css';

const Header = () => {
    return (
        <>
            <header className="header">
                <ul className="nav">
                    <li><a href="/">Docs</a></li>
                    <li><a href="/search/">Search packages</a></li>
                    <li><a href="/blog/">Blog</a></li>
                    <li><a href="/stats/">Stats</a></li>
                </ul>
                <a href="/"><img className="logo" src="/img/bower-logo.svg" alt="Bower logo" /></a>
                <h1>Bower Search</h1>
                <h4>Powered by <a href="https://libraries.io/">libraries.io</a></h4>
            </header>
            <div className='notification'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
        </>        
      );
};
  
export default Header;