import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState, useRef } from 'react';
import AppContext from '../AppContext'; // Adjust the path as needed

const libraries = ['places'];
const mapContainerStyle = {
    width: '100%',
    height: '75vh', // 75% of the viewport height
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Container takes full height of the viewport
    padding: '10vh 0' // Adds top and bottom padding to create gaps
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
    console.log(trip);
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState(center);
    const [scavengerHuntArea, setScavengerHuntArea] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBjCRQ3tzekMYmR-TlKe_dT9zABPsxPFvA',
        libraries,
    });

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
                console.log(currentUserLocation);
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
    <div style={containerStyle} className="map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        
      >
        <Marker position={center} />
      {userLocation && 
      <Marker
      position={userLocation}
      // Use a built-in symbol as an icon
      icon={userIcon}
  />}
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
  );
};

export default Tour;