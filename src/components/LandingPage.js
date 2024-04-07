import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../AppContext'; // Adjust the path as needed

export default function LandingPage() {
    let navigate = useNavigate();
    const { routesData } = useContext(AppContext);


    const handleCardClick = (tripId) => {
        navigate(`/trip/${tripId}`);
    };
    

    return (
    <div>
      <header className="header">
        <h1>Tab1</h1>
      </header>
      <div className="card-container">
        {routesData.map((trip) => (
          <div key={trip.id} className="card" onClick={() => handleCardClick(trip.id)}>
            <img src={trip.image} alt={trip.name} />
            <div className="card-content">
              <h2>{trip.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
