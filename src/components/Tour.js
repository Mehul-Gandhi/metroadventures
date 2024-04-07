import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState, useRef } from 'react';
import AppContext from '../AppContext'; // Adjust the path as needed
import Button from '@mui/material/Button';
import '../Tour.css'; // Import CSS file for styling
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


const libraries = ['places'];
const mapContainerStyle = {
    width: '100%',
    height: '100vh', // 75% of the viewport height
  };

  const containerStyle = {
    position: 'relative',  // Ensure the container is positioned relatively for accurate padding
    height: '100vh', // Container takes full height of the viewport
};

const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const Tour = () => {
    let { tripId } = useParams();
    const navigate = useNavigate();
    const { routesData } = useContext(AppContext);
    const trip = routesData[parseInt(tripId) - 1];
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState(center);
    const [scavengerHuntArea, setScavengerHuntArea] = useState(null);
    // const [clueImage, setClueImage] = useState(null); // State to store clue 2 image
    const [showCluesPopup, setShowCluesPopup] = useState(false);
    const [currentClueIndex, setCurrentClueIndex] = useState(0);
    const [revealLocation, setRevealLocation] = useState(false);
    const totalClues = 3;  // Assuming there are 3 clues

    const clues = [
        "This is clue one.",
        "This is clue two.",
        "This is clue three."
    ];

    const handleNextClue = () => {
        if (currentClueIndex < totalClues - 1) {
            setCurrentClueIndex(currentClueIndex + 1);
            setRevealLocation(currentClueIndex === 2);
        }
    };

    const handleRevealLocation = () => {
        setCurrentClueIndex(totalClues - 1); // Set to the last clue
        setRevealLocation(totalClues - 1 === 2);
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${process.env.REACT_APP_MAPS_KEY}`,
        libraries,
    });

     // Function to render stop circles
     const renderStops = (stopCount) => {
        const stops = [];
        for (let i = 0; i < stopCount; i++) {
            stops.push(<div key={i} className="stop-circle">Stop {i + 1}</div>);
        }
        return stops;
    };


    const userIcon = isLoaded ? {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#4285F4',
        strokeWeight: 2,
    } : null;

    const handleQuitRoute = () => {
        navigate('/'); // Navigate to the home page
    };


  useEffect(() => {

    const updateLocation = () =>
    { if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const currentUserLocation = { lat: latitude, lng: longitude };
                setUserLocation(currentUserLocation);
                setCenter(currentUserLocation);
                // console.log(currentUserLocation);
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );

    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}
    if (isLoaded) {
   
 
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: trip.address }, (results, status) => {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            setMapCenter(location);
            // Assuming a block is approximately 100 meters, set the radius for 0.1 blocks (10 meters)
            setScavengerHuntArea({
                center: location,
                radius: 100,
            });
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
        }
    });
    updateLocation();
    const locationInterval = setInterval(updateLocation, 10); 
    return () => {
        clearInterval(locationInterval); // Clear the interval when the component unmounts
    };
}
}, [isLoaded]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }



  return (
    <div>
    <div style={containerStyle} className="map-container tour-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        
      >
        <div className="stop-circles-container" style={{position: 'relative'}}>{renderStops(4)}</div>
        <Marker position={center} />
      {userLocation && 
      <Marker
      position={userLocation}
      // Use a built-in symbol as an icon
      icon={userIcon}
  />}
<div className="button-container">
        <Button 
            variant="outlined" 
            size= "large"
            onClick={handleQuitRoute}
            style={{ 
                color: '#29b6f6', 
                borderColor: '#29b6f6', 
                margin: '5px',
                textTransform: 'none',
                backgroundColor: 'white'
            }}
        >
            Quit Route
        </Button>

<Button 
variant="outlined" 
size= "large"
style={{ 
    color: '#29b6f6', 
    borderColor: '#29b6f6', 
    margin: '5px',
    textTransform: 'none',
    backgroundColor: 'white'
}}
onClick={() => setShowCluesPopup(true)}

>Show Clues</Button>

<Dialog open={showCluesPopup} onClose={() => setShowCluesPopup(false)}>
    <DialogTitle>
        Clues
        <IconButton
            aria-label="close"
            onClick={() => setShowCluesPopup(false)}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
        >
            <CloseIcon />
        </IconButton>
    </DialogTitle>
    <DialogContent>
        {clues.slice(0, currentClueIndex + 1).map((clue, index) => (
            <Typography key={index} variant="body1" gutterBottom>
            {clue}
        </Typography>
        ))}
        {revealLocation && (
        <Typography variant="body1" gutterBottom>
            <b>Location:</b> {trip.address}
        </Typography>
    )}
    </DialogContent>
    <DialogActions>
        {currentClueIndex < totalClues - 1 && (
            <Button onClick={handleNextClue}>Next Clue</Button>
        )}
        <Button onClick={handleRevealLocation}>Reveal Location</Button>
    </DialogActions>
</Dialog>


        <Button 
            variant="outlined" 
            size= "large"
            disabled 
            style={{ 
                color: '#ccc', 
                borderColor: '#ccc', 
                margin: '5px',
                textTransform: 'none',
                backgroundColor: 'white'
            }}
        >
            Greyed Out
        </Button>
    </div>
        {userLocation && (
                    <Circle
                        center={userLocation}
                        radius={100} // Radius in meters
                        options={{
                            fillColor: 'rgba(66, 133, 244, 0.2)',
                            strokeColor: 'rgba(66, 133, 244, 0.5)',
                            strokeWeight: 1,
                        }}
                        />
        )}
        {scavengerHuntArea && (
                    <Circle
                        center={scavengerHuntArea.center}
                        radius={scavengerHuntArea.radius}
                        options={{
                            fillColor: 'rgba(255, 165, 0, 0.5)', // Light orange with some transparency
                            strokeColor: 'rgba(255, 165, 0, 1)', // Solid orange for the stroke
                            strokeWeight: 1,
                        }}
                    />
        )}
  </GoogleMap>
      
    </div>
    </div>
  );
};

export default Tour;