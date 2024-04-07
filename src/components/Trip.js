import { useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../AppContext'; // Adjust the path as needed
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import StarIcon from '@mui/icons-material/Star';
import { Grid, Typography, Box, Divider, Button  } from '@mui/material';
import SubwayIcon from '@mui/icons-material/Subway';
import FastfoodIcon from '@mui/icons-material/Fastfood'; // Assuming this for 'Snacks'
import InstagramIcon from '@mui/icons-material/Instagram'; 
import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import RestaurantIcon from '@mui/icons-material/Restaurant'; // Assuming this for 'Food'/'Dining' as 'utensils'
import MuseumIcon from '@mui/icons-material/Museum';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'; // Assuming this for 'Entertainment' as 'film'
import ImageIcon from '@mui/icons-material/Image';
import NatureIcon from '@mui/icons-material/Nature'; // Assuming this for 'Outdoor' as 'tree'

export default function Trip () {
    let { tripId } = useParams();
    const navigate = useNavigate();
    const { routesData } = useContext(AppContext);
    const trip = routesData[parseInt(tripId) - 1];
    const iconDictionary = {
        subway: <SubwayIcon />,
        cutlery: <FastfoodIcon />, // Example substitution for 'Snacks'
        instagram: <InstagramIcon />,
        // Add other icon mappings as needed
        book: <BookIcon />,
        utensils: <RestaurantIcon />,
        museum: <MuseumIcon />,
        'shopping-bag': <ShoppingBagIcon />,
        film: <LocalMoviesIcon />,
        image: <ImageIcon />,
        tree: <NatureIcon />,

    };

    const handleStartTour = () => {
        navigate(`/Tour/${trip.id}`); // Assuming `trip.id` is the correct identifier
    };

    const renderIcon = (iconName) => {
        return iconDictionary[iconName] || <Box />; // Return a default Box if the icon name is not found
    };

    return (       
    <Box display="flex" flexDirection="column" alignItems="center">
        <div className="card2">
        <img src={"/" + trip.filePath} alt={trip.name} style={{ maxWidth: '100%', height: 'auto' }} />
        <div className="card-content">
            <h2>{trip.name}</h2>
        </div>
    </div>
    <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
            <AccessTimeIcon />
            <Typography>{trip.timeToComplete}</Typography>
        </Grid>
        <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
            <DirectionsWalkIcon />
            <Typography>{trip.miles} miles</Typography>
        </Grid>
        <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
            <StarIcon sx={{ color: 'yellow' }} />
            <Typography>{trip.rating} / 5</Typography>
        </Grid>
    </Grid>
    <Grid container justifyContent="center" spacing={2} style={{ padding: '20px' }}>
        <Grid item xs={12}>
            <Typography variant="h6" component="span" style={{ fontWeight: 'bold' }}>
            Description:
            </Typography>
            <Typography variant="body1" component="span" style={{ marginLeft: '10px' }}>
            {trip.description}
            </Typography>
        </Grid>
    </Grid>

    <Divider orientation="vertical" flexItem />

    <Grid container justifyContent="center" spacing={2} style={{ padding: '20px' }}>
        <Grid item xs={12}>
            <Typography variant="h6" component="span" style={{ fontWeight: 'bold' }}>
            Start Location:
            </Typography>
            <Typography variant="body1" component="span" style={{ marginLeft: '10px' }}>
            {trip.address}
            </Typography>
        </Grid>
    </Grid>

    <Grid container justifyContent="center" spacing={2} >
        {trip.tags.slice(0, 9).map((tag, index) => (
            <Grid item key={index} xs={4} >
                <Box display="flex" flexDirection="column" alignItems="center" 
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: '50%', // Makes the border circular
                    width: '90px', // Ensures the width of the circle
                    height: '90px', // Ensures the height of the circle
                    padding: '10px', // Adds some space inside the circle
                    margin: '10px', // Adds some outside space around the circle
                    justifyContent: "center"
                  }}
                  >
                    {renderIcon(tag.icon)}
                    <Typography>{tag.name}</Typography>
                </Box>
            </Grid>
            ))}
    </Grid>
            <Button
                variant="outlined"
                onClick={handleStartTour}
                size="large"
                style={{
                    marginTop: '20px',
                    color: '#4285F4',
                    borderColor: '#4285F4',
                    borderRadius: '50px', // Circular shape
                    textTransform: 'none', // Prevents uppercase transformation
                    padding: '15px 30px', // Increase padding to make the button larger
                    fontSize: '1.2rem',
                }}
                startIcon={<DirectionsWalkIcon />}
            >
                Start Tour
            </Button>

</Box>
    );
}