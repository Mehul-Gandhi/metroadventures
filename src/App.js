import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Adjust the path as necessary
import Coupons from './components/Coupons'; // Adjust the path as necessary
import Past from './components/Trips'; // Adjust the path as necessary
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/past" element={<Past />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
