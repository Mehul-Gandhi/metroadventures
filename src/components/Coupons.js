import React, { useState } from "react";
import { Button, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const couponsData = [
    {
        id: 1,
        restaurant: "Jamba Juice",
        address: "3251 20th Ave Space 169, San Francisco, CA 94132",
        menuItem: "Smoothies - $2 off",
        mapsLink: "https://maps.app.goo.gl/7CedrhAMzrmX2MoV8",
        filePath: "/jamba.png"
    },
    {
        id: 2,
        restaurant: "Sizzling Lunch",
        address: "2475 Telegraph Ave, Berkeley, CA 94704",
        menuItem: "Asian Fusion - $5 off",
        mapsLink: "https://maps.app.goo.gl/EiuT6YErXqdJyQUP6",
        filePath: "/sizzling.jpg"
    },
    {
        id: 3,
        restaurant: "McDonalds",
        address: "1201 Ocean Ave, San Francisco, CA 94112",
        menuItem: "Ice Cream - Free",
        mapsLink: "https://maps.app.goo.gl/iegVqAEr5yXwodmH7",
        filePath: "/mcdonalds.jpg"
    },
];

export default function Coupons () {
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const navigate = useNavigate();

    const handleCouponClick = (coupon) => {
        setSelectedCoupon(coupon);
    };

    const handleClose = () => {
        setSelectedCoupon(null);
    };

    return  (
        <div>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                <IconButton onClick={() => navigate('/')} style={{ position: 'absolute', left: 10 }}>
                    <ArrowBackIcon />
                </IconButton>
                <h1>Coupons</h1>
            </header>
            <div style={{ maxHeight: '400px' }}>
                {couponsData.map(coupon => (
                    <Card 
                        key={coupon.id} 
                        onClick={() => handleCouponClick(coupon)} 
                        style={{ 
                            margin: '10px', 
                            cursor: 'pointer', 
                            boxShadow: selectedCoupon?.id === coupon.id ? '0px 0px 15px rgba(237, 231, 225, 0.5)' : '',
                            transition: 'box-shadow 0.3s ease-in-out',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.boxShadow = selectedCoupon?.id === coupon.id ? '0px 0px 15px rgba(33, 150, 243, 0.5)' : ''}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={coupon.filePath}
                            alt={coupon.restaurant}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {coupon.restaurant}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {coupon.menuItem}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {selectedCoupon && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', zIndex: 100 }}>
                    <h2>{selectedCoupon.restaurant}</h2>
                    <p>Address: {selectedCoupon.address}</p>
                    <p>Menu Item: {selectedCoupon.menuItem}</p>
                    <Button variant="contained" href={selectedCoupon.mapsLink} target="_blank">
                        Open in Google Maps
                    </Button>
                    <Button variant="contained" onClick={handleClose} style={{ marginLeft: '10px' }}>
                        Close
                    </Button>
                </div>
            )}
        </div>
    );
}
