import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import VisitorModal from './components/VisitorModal';

// Original Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Workshops from './pages/Workshops';
import ProductsPage from './pages/Products';
import Articles from './pages/Articles';

// New Pages
import ForSchools from './pages/ForSchools';
import WorkshopDetail from './pages/WorkshopDetail';
import Camps from './pages/Camps';
import CampDetail from './pages/CampDetail';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <main>
          <Routes>
            {/* Original Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/articles" element={<Articles />} />

            {/* New Routes */}
            <Route path="/for-schools" element={<ForSchools />} />
            <Route path="/workshops/:slug" element={<WorkshopDetail />} />
            <Route path="/camps" element={<Camps />} />
            <Route path="/camps/:slug" element={<CampDetail />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
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
