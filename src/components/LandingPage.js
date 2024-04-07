import { React } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LandingPage() {
    let navigate = useNavigate();

    const handleCardClick = (tripId) => {
        navigate(`/route/${tripId}`);
    };
    const routesData = [
        {
          filePath: "ggfcf_rossalley.jpg",
          description: 'Explore the historic Columbus Corridor and its vibrant culture.',
          timeToComplete: '2 hours',
          tags: [
            { name: 'transit accessible', icon: 'subway' },
            { name: 'Snacks', icon: 'cutlery' },
            { name: 'Instagrammable', icon: 'instagram' },
          ],
          address: 'Columbus Corridor 1234 xyz street',
          name: 'Columbus Corridor',
          image: "./ggfcf_rossalley.jpg", // assuming this is imported at the top
          rating: "3.8",
          miles: "2.5",
        },
        {
          filePath: 'bookshop_gateway.jpg',
          description: 'Discover the vibrant scenes of Chinatown and its rich history.',
          timeToComplete: '1 hour',
          tags: [
            { name: 'Culture', icon: 'book' },
            { name: 'Food', icon: 'utensils' },
            { name: 'Historic', icon: 'landmark' },
          ],
          address: 'Chinatown 5678 abc street',
          name: 'Chinatown',
          image: 'bookshop_gateway.jpg', // assuming this is imported at the top
          rating: "5",
          miles: "1.2",
        },
        {
          filePath: 'citylight_alleywaymural.jpg',
          description: 'Experience the bustling market street, famous for its shopping districts.',
          timeToComplete: '1.5 hours',
          tags: [
            { name: 'Shopping', icon: 'shopping-bag' },
            { name: 'Dining', icon: 'utensils' },
            { name: 'Entertainment', icon: 'film' },
          ],
          address: 'Market Street 9101 def avenue',
          name: 'Market Street',
          image: 'citylight_alleywaymural.jpg', 
          rating: "3",
          miles: "1.2",
        },
        {
          filePath: 'westportalpark_playground.jpg',
          description: 'Take in the breathtaking views of the Golden Gate Bridge and surrounding areas.',
          timeToComplete: '2.5 hours',
          tags: [
            { name: 'Scenic Views', icon: 'image' },
            { name: 'Historic', icon: 'landmark' },
            { name: 'Outdoor', icon: 'tree' },
          ],
          address: 'Golden Gate Bridge 1112 ghi road',
          name: 'Golden Gate Bridge',
          image: 'westportalpark_playground.jpg', // assuming this is imported at the top
          rating: "4",
          miles: "0.8",
        },
      ];

    return (
    <div>
      <header className="header">
        <h1>Tab1</h1>
      </header>
      <div className="card-container">
        {routesData.map((trip) => (
          <div key={trip.id} className="card" onClick={() => handleCardClick(trip.id)}>
            <img src={trip.image} alt={trip.name} />
            <div className="card-content">
              <h2>{trip.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
