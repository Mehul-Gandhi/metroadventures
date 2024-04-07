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

    return (
        <div>
             <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
                <IconButton onClick={() => navigate('/')} style={{ marginRight: '10px' }}>
                    <ArrowBackIcon />
                </IconButton>
                <h1 style={{ flexGrow: 1, textAlign: 'center', margin: 0 }}>Coupons</h1>
                <div style={{ width: 48 }}></div>  {/* Placeholder for balancing the layout */}
            </header>
            <div style={{  maxHeight: '400px' }}>
                {couponsData.map(coupon => (
                    <Card key={coupon.id} onClick={() => handleCouponClick(coupon)} style={{ margin: '10px', cursor: 'pointer' }}>
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
                    <img src={selectedCoupon.filePath} alt={selectedCoupon.restaurant} style={{ maxWidth: '100%', maxHeight: '200px' }} />
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
