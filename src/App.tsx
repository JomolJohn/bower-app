import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Packages from './pages/Packages';
import API from './pages/API';
import Configuration from './pages/Configuration';
import Resolvers from './pages/Resolvers';
import Tools from './pages/Tools';
import About from './pages/About';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-container">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/api" element={<API />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/resolvers" element={<Resolvers />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
