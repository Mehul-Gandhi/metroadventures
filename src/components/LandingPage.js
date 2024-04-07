import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../AppContext'; // Adjust the path as needed
import CouponIcon from '@mui/icons-material/LocalOffer';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import NavBar from "./NavBar.js";
import { Button, IconButton, Typography } from '@mui/material';


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

    const handleAboutUs = () => {
      navigate('/about'); // Change '/recent-trips' to the actual path for recent trips
  };

    return (
    <div>
          <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px'
      }}>
        <Typography variant="h6" style={{ flexGrow: 1, color: '#29b6f6' }}>
        </Typography>
        <div>
          <Button 
            startIcon={<InfoIcon />}
            onClick={handleAboutUs}
            style={{ color: '#29b6f6' }}
          >
            Info
          </Button>
          <Button 
            startIcon={<CouponIcon />}
            onClick={handleViewCoupons}
            style={{ color: '#29b6f6' }}
          >
            Coupons
          </Button>
          <Button 
            startIcon={<HistoryIcon />}
            onClick={handleRecentTrips}
            style={{ color: '#29b6f6' }}
          >
            Past Trips
          </Button>
        </div>
      </div>
      <header className="header" style={{margin: "10px"}}>
        <h1>Scavenger Hunt Trip! </h1>
       
      </header>
      <div className="card-container">
        {routesData.map((trip) => (
          <div key={trip.id} className="card" onClick={() => handleCardClick(trip.id)}>
            <img src={trip.filePath} alt={trip.name} />
            <div className="card-content">
              <h2>{trip.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
