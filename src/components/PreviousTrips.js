import React from "react";
import { Card, CardContent, Typography, IconButton, CardMedia, CardActionArea, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import {  
    TimelineItem, 
    TimelineSeparator,
     TimelineConnector, 
     TimelineContent, 
     TimelineDot,
     TimelineOppositeContent
     } from '@mui/lab';
import Timeline from '@mui/lab/Timeline';

export default function PreviousTrips() {
    const navigate = useNavigate();

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
          date: "April 8, 2024"
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
          date: "March 14, 2024"
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
          date: "February 29, 2024"

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
          date: "July 4, 2023"

        },
      ];

    return (
        <div style={{ margin: '20px' }}>
            <Box display="flex" width="100%" justifyContent="flex-start">
                <IconButton onClick={() => navigate('/')} style={{ margin: '10px' }}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Typography variant="h4" gutterBottom>
                Your Previous Trips
            </Typography>
            <Timeline align="alternate">
            {data.map((trip, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {trip.date} {/* Here you put the date */}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {index < data.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={trip.filePath}
                    alt={trip.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {trip.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {trip.description}
                    </Typography>
                    {/* Additional content like miles, time, etc. */}
                  </CardContent>
                </CardActionArea>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
            </Timeline>
        </div>
    );
}