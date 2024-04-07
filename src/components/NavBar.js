import React from 'react';
import { Button, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CouponIcon from '@mui/icons-material/LocalOffer';
import HistoryIcon from '@mui/icons-material/History';

const Navbar = ({ handleAboutUs, handleViewCoupons, handleRecentTrips }) => {
  return (
    <div style={{ position: 'absolute', right: 10, top: 10, margin: "10px" }}>
        <Button 
        startIcon={<InfoIcon />}
        onClick={handleAboutUs}
        style={{ margin: '0 10px', color: '#29b6f6', fontSize: '1rem' }}
        onMouseEnter={(e) => e.target.style.color = '#1e88e5'}
        onMouseLeave={(e) => e.target.style.color = '#29b6f6'}
    >
        Info
    </Button>
    <Button 
        startIcon={<CouponIcon />}
        onClick={handleViewCoupons}
        style={{ margin: '0 10px', color: '#29b6f6', fontSize: '1rem' }}
        onMouseEnter={(e) => e.target.style.color = '#1e88e5'}
        onMouseLeave={(e) => e.target.style.color = '#29b6f6'}
    >
        Coupons
    </Button>
    <Button 
        startIcon={<HistoryIcon />}
        onClick={handleRecentTrips}
        style={{ margin: '0 10px', color: '#29b6f6', fontSize: '1rem' }}
        onMouseEnter={(e) => e.target.style.color = '#1e88e5'}
        onMouseLeave={(e) => e.target.style.color = '#29b6f6'}
    >
        Past Trips
    </Button>
        </div>
  );
};

export default Navbar;