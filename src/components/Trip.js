import { useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../AppContext'; // Adjust the path as needed

export default function Trip () {
    let { tripId } = useParams();
    const { routesData } = useContext(AppContext);
    
    return (<div>{routesData[parseInt(tripId) - 1].name}</div>);
}