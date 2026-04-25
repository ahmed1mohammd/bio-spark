import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import VisitorModal from './components/VisitorModal';
import Home from './pages/Home';
import Events from './pages/Events';
import Workshops from './pages/Workshops';
import ProductsPage from './pages/Products';
import Articles from './pages/Articles';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/articles" element={<Articles />} />
          </Routes>
        </main>

        <Footer />
        <FloatingWhatsApp />
        <VisitorModal />
      </div>
    </Router>
  );
}

export default App;
