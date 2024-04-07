import React, { createContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {

    var data = [
        {
          filePath: "./ggfcf_rossalley.jpg",
          description: 'Explore the historic Columbus Corridor and its vibrant culture.',
          timeToComplete: '2 hours',
          tags: [
            { name: 'transit accessible', icon: 'subway' },
            { name: 'Snacks', icon: 'cutlery' },
            { name: 'Instagrammable', icon: 'instagram' },
          ],
          address: '3251 20th Ave, San Francisco, CA 94132',
          name: 'Columbus Corridor',
          image: "./ggfcf_rossalley.jpg", // assuming this is imported at the top
          rating: "3.8",
          miles: "2.5",
          id: 1,
        },
        {
          filePath: 'bookshop_gateway.jpg',
          description: 'Discover the vibrant scenes of Chinatown and its rich history.',
          timeToComplete: '1 hour',
          tags: [
            { name: 'Culture', icon: 'book' },
            { name: 'Food', icon: 'utensils' },
            { name: 'Historic', icon: 'museum' },
          ],
          address: 'Chinatown 5678 abc street',
          name: 'Chinatown',
          image: 'bookshop_gateway.jpg', // assuming this is imported at the top
          rating: "5",
          miles: "1.2",
          id: 2,
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
          id: 3,
        },
        {
          filePath: 'westportalpark_playground.jpg',
          description: 'Take in the breathtaking views of the Golden Gate Bridge and surrounding areas.',
          timeToComplete: '2.5 hours',
          tags: [
            { name: 'Scenic Views', icon: 'image' },
            { name: 'Historic', icon: 'museum' },
            { name: 'Outdoor', icon: 'tree' },
          ],
          address: 'Golden Gate Bridge 1112 ghi road',
          name: 'Golden Gate Bridge',
          image: 'westportalpark_playground.jpg', // assuming this is imported at the top
          rating: "4",
          miles: "0.8",
          id: 4,
        },
      ];
      const [routesData, setRoutesData] = useState(data);

  return (
    <AppContext.Provider value={{ routesData, setRoutesData }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
