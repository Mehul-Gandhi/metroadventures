import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../AppContext'; // Adjust the path as needed
import IconButton from '@mui/material/IconButton';
import CouponIcon from '@mui/icons-material/LocalOffer';
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';

export default function LandingPage() {
    let navigate = useNavigate();
    const { routesData } = useContext(AppContext);


    const handleCardClick = (tripId) => {
        navigate(`/trip/${tripId}`);
    };

    const handleViewCoupons = () => {
        navigate('/coupons'); // Change '/coupons' to the actual path for coupons
    };
    
    const handleRecentTrips = () => {
        navigate('/prevTrips'); // Change '/recent-trips' to the actual path for recent trips
    };

    return (
    <div>
      <header className="header">
        <h1>Scavenger Hunt Trip! </h1>
        <div style={{ position: 'absolute', right: 10, top: 10 }}>
                    <Button 
                        startIcon={<CouponIcon />}
                        onClick={handleViewCoupons}
                        style={{ margin: '0 10px', color: '#29b6f6', fontSize: '1rem' }}
                        onMouseEnter={(e) => e.target.style.color = '#1e88e5'}
                        onMouseLeave={(e) => e.target.style.color = '#29b6f6'}
                    >
                        View Coupons
                    </Button>
                    <Button 
                        startIcon={<HistoryIcon />}
                        onClick={handleRecentTrips}
                        style={{ margin: '0 10px', color: '#29b6f6', fontSize: '1rem' }}
                        onMouseEnter={(e) => e.target.style.color = '#1e88e5'}
                        onMouseLeave={(e) => e.target.style.color = '#29b6f6'}
                    >
                        View Trips
                    </Button>
                </div>
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
