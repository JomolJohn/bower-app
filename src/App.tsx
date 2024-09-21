import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default App;
