import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import LanguageProvider from './components/context/LanguageProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
    <LanguageProvider>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
);
