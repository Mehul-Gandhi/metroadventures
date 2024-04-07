import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Adjust the path as necessary
import Coupons from './components/Coupons'; // Adjust the path as necessary
import PreviousTrips from './components/PreviousTrips'; // Adjust the path as necessary
import { AppProvider } from './AppContext';
import './App.css';
import Trip from './components/Trip';
import Tour from './components/Tour';

export default function App() {
  return (
    <AppProvider>
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/past" element={<PreviousTrips />} />
          <Route path="/trip/:tripId" element={<Trip />} />
          <Route path="/tour/:tripId" element={<Tour />} />

        </Routes>
      </div>
    </BrowserRouter>
    </AppProvider>
  );
}
