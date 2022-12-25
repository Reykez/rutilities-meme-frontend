import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sort from './Pages/Sort/Sort';
import CookieModal from './CookieModal';

function App() {
  return (
    <div className="bg-gray-600 h-screen w-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="sort" element={<Sort />} />
        </Routes>
        <CookieModal />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
