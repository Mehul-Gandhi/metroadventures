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
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import PlaceIcon from '@mui/icons-material/Place';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DescriptionIcon from '@mui/icons-material/Description';

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
    const trip = routesData[parseInt(tripId)];
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState(center);
    const [scavengerHuntArea, setScavengerHuntArea] = useState(null);
    // const [clueImage, setClueImage] = useState(null); // State to store clue 2 image
    const [showCluesPopup, setShowCluesPopup] = useState(false);
    const [currentClueIndex, setCurrentClueIndex] = useState(0);
    const [revealLocation, setRevealLocation] = useState(false);
    const [attractionNum, setAttractionNum] = useState(0);
    const [clues, setClues] = useState(trip.pois[attractionNum].clues.map(clue => clue.text)); // Initialize clues
    const [gameCompleted, setGameCompleted] = useState(false);
    const totalClues = 3;  // Assuming there are 3 clues
    const totalAttractions = trip.pois.length;

    // console.log(clues);
    

    const handleNextClue = () => {
        if (currentClueIndex < totalClues - 1) {
            setCurrentClueIndex(currentClueIndex + 1);
            // setRevealLocation(currentClueIndex === totalClues - 1);
            console.log(revealLocation);
        }
    };

    const handleRevealLocation = () => {
        setCurrentClueIndex(totalClues); // Set to the last clue
        setRevealLocation(totalClues === 3);
        console.log(revealLocation);
    };

    const nextLocation = () => {
        if (attractionNum < totalAttractions - 1 && revealLocation) {
            setAttractionNum(attractionNum + 1);
        } else if (attractionNum === totalAttractions - 1 && revealLocation) {
            // Set game as completed when the last location is reached and the location is revealed
            setGameCompleted(true);
        }
}

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${process.env.REACT_APP_MAPS_KEY}`,
        libraries,
    });

     // Function to render stop circles
     const renderStops = (stopCount) => {
        const stops = [];
        for (let i = 0; i < stopCount; i++) {
            const isActive = i <= attractionNum; // Active if this stop or previous ones
            stops.push(
                <div key={i} className={`stop-circle ${isActive ? 'active' : ''}`}>
                    Stop {i + 1}
                </div>
            );
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
        // Update the clues when the attractionNum changes
        if (trip.pois[attractionNum]) {
        setClues(trip.pois[attractionNum].clues.map(clue => clue.text));
        setCurrentClueIndex(0);
        setRevealLocation(false);

        // const location = {
        //     lat: trip.pois[attractionNum].location.latitude,
        //     lng: trip.pois[attractionNum].location.longitude
        // };
        // setMapCenter(location);
        // setScavengerHuntArea({
        //     center: location,
        //     radius: 2500,
        // });
    }}, [isLoaded, attractionNum, trip.pois]);


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

        const location = {
            lat: trip.pois[attractionNum].location.latitude,
            lng: trip.pois[attractionNum].location.longitude
        };
        console.log(location);
        setMapCenter(location);
        setScavengerHuntArea({
            center: location,
            radius: 1000,
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
        <div className="stop-circles-container" style={{position: 'relative'}}>{renderStops(totalAttractions)}</div>
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
        <div key={index}> {/* Ensure that key is at the top level of map */}
            <Typography variant="body1" component="div" gutterBottom style={{ fontWeight: 'bold' }}>
            <FingerprintIcon /> Clue {index + 1}:
            </Typography>
            <Typography variant="body1" gutterBottom>
            {clue}
            </Typography>
        </div>
        ))}
        {revealLocation && (<div>
        <Typography variant="body1" gutterBottom>
            <StorefrontIcon/> <b>Name:</b> {trip.pois[attractionNum].name}
        </Typography>
        <Typography variant="body1" gutterBottom>
            <PlaceIcon /> <b>Location:</b> (Latitude: {trip.pois[attractionNum].location.latitude}, 
            Longitude:  {trip.pois[attractionNum].location.longitude})
        </Typography>
        <Typography variant="body1" gutterBottom>
            <DescriptionIcon /> <b>Description: </b> {trip.pois[attractionNum].description}
        </Typography>
        </div>
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
            onClick={nextLocation}
            style={{ 
                color: '#29b6f6', 
                borderColor: '#29b6f6', 
                margin: '5px',
                textTransform: 'none',
                backgroundColor: 'white'
            }}
        >
            Next Location
        </Button>
        {gameCompleted && (
  <Dialog open={gameCompleted} onClose={() => setGameCompleted(false)}>
    <DialogTitle>
      Congratulations!
      <IconButton
        aria-label="close"
        onClick={() => setGameCompleted(false)}
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
        <Typography variant="h6" gutterBottom>
            You Completed the Route! 🎉🎉🎉
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <DirectionsWalkIcon color="primary" />
            <Typography variant="body1" style={{ marginLeft: '8px' }}>
            {trip.miles} miles walked
            </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <AccessTimeIcon color="primary" />
            <Typography variant="body1" style={{ marginLeft: '8px' }}>
            {trip.estimated_time} hours
            </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <LinearScaleIcon color="primary" />
            <Typography variant="body1" style={{ marginLeft: '8px' }}>
            2500 steps taken
            </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <PlaceIcon color="primary" />
            <Typography variant="body1" style={{ marginLeft: '8px' }}>
            {trip.tags.map((tag, index) => (
                <span key={index}>
                {tag.name}{index < trip.tags.length - 1 ? ', ' : ''}
                </span>
            ))}
            </Typography>
        </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {
            setGameCompleted(false);
            navigate('/');
        }}>Close</Button>
        </DialogActions>
    </Dialog>
)}
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
        {isLoaded && scavengerHuntArea && (
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