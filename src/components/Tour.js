import { useState } from 'react';
import { useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext'; // Adjust the path as needed
import './tour.css'; // Import CSS file for styling

export default function Tour() {
    const [showCluesPopup, setShowCluesPopup] = useState(false); // State to control popup visibility
    const [clueStatus, setClueStatus] = useState([false, false, false, false]); // State to track the reveal status of clues
    const [clueImage, setClueImage] = useState(null); // State to store clue 2 image
    let { tripId } = useParams();
    const navigate = useNavigate();
    const { routesData } = useContext(AppContext);
    const trip = routesData[parseInt(tripId) - 1];
    console.log(trip);

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

    return (
        <div className="tour-container">
            {/* Display trip name */}
            <div>{trip.name}</div>

            {/* Render stop circles */}
            <div className="stop-circles-container">{renderStops(10)}</div>

            {/* Buttons container */}
            <div className="button-container">
                <button className="blue-button">Quit Route</button>
                <button className="blue-button" onClick={handleCluesClick}>Clues</button>
                <button className="grey-button" disabled>Greyed Out</button>
            </div>

            {/* Clues popup */}
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
        </div>
    );
}
