import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState, useRef } from 'react';
import AppContext from '../AppContext'; // Adjust the path as needed
import '../Tour.css'; // Import CSS file for styling

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
    const [showCluesPopup, setShowCluesPopup] = useState(false); // State to control popup visibility
    const [clueStatus, setClueStatus] = useState([false, false, false, false]); // State to track the reveal status of clues
    const [clueImage, setClueImage] = useState(null); // State to store clue 2 image
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

    // Function to handle showing the clues popup
    const handleCluesClick = () => {
        setShowCluesPopup(true);
    };

    // Function to handle closing the clues popup
    const handleClosePopup = () => {
        setShowCluesPopup(false);
    };

    // Function to handle revealing the clue content
    const handleRevealClue = (index) => {
        if (index === 1) {
            // Set clue 2 image path
            setClueImage('/path/to/image.jpg');
        }
        setClueStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[index] = true;
            return newStatus;
        });
    };

    // Function to handle revealing the location clue
    const handleRevealLocation = () => {
        setClueStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[3] = true;
            return newStatus;
        });
    };

    // Function to render clue content
    const renderClueContent = (clueText, index) => {
        return (
            <div key={index}>
                <div>{index === 3 ? "Location" : `Clue ${index + 1}`}</div>
                {clueStatus[index] && index !== 1 && <div>{clueText}</div>}
                {clueStatus[index] && index === 1 && <img src={clueImage} alt="Clue 2" />}
            </div>
        );
    };

    // Function to render additional content based on clue reveal status
    const renderAdditionalContent = () => {
        return (
            <div className="clues-list">
                {renderClueContent("This is clue one.", 0)}
                {renderClueContent("This is clue two.", 1)}
                {renderClueContent("This is clue three.", 2)}
                {renderClueContent("the location is san fran", 3)}
            </div>
        );
    };


    const userIcon = isLoaded ? {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#4285F4',
        strokeWeight: 2,
    } : null;


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
                <button className="blue-button">Quit Route</button>
                <button className="blue-button" onClick={handleCluesClick}>Clues</button>
                <button className="grey-button" disabled>Greyed Out</button>
            </div>

            {showCluesPopup && (
                <div className="popup">
                    <div className="popup-header">Clues</div>
                    {renderAdditionalContent()}
                    <div className="popup-buttons">
                        <button onClick={handleClosePopup}>Close</button>
                        {clueStatus.map((status, index) => (
                            !status && index !== 3 && <button key={index} onClick={() => handleRevealClue(index)}>Reveal Clue {index + 1}</button>
                        ))}
                        {!clueStatus[3] && <button onClick={handleRevealLocation}>Reveal Location</button>}
                    </div>
                </div>
            )}
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