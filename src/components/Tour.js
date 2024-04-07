import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../AppContext'; // Adjust the path as needed

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: '',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Tour;