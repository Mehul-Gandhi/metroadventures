import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import CouponIcon from '@mui/icons-material/CardGiftcard';
import GroupIcon from '@mui/icons-material/Group';
import UpdateIcon from '@mui/icons-material/Update';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
export default function About() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <IconButton onClick={() => navigate('/')} style={{ margin: '20px 0' }}>
        <HomeIcon fontSize="large" />
      </IconButton>

      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          How It Works
        </Typography>
        
        <Typography variant="body1" paragraph>
          Discover hidden gems and local favorites in your city with our interactive scavenger hunt app. We collaborate with neighborhood businesses and eateries to enhance community spirit and spotlight local offerings.
        </Typography>

        <Typography variant="body1" paragraph>
          Immerse yourself in fun and exploration, with fresh adventures updated weekly featuring exclusive deals. Rally your friends for a group outing, solve clues, and earn coupons as your explore the urban landscape.
        </Typography>

        <Box my={4}>
          <Typography variant="h6">Engage in the Adventure:</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Embark on routes averaging four destinations filled with discovery and delight." />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Solve intriguing clues with your band of friends and collect rewards together." />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <UpdateIcon />
              </ListItemIcon>
              <ListItemText primary="New quests and deals are released every week, keeping the excitement alive." />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Gain experience points for using fewer clues, unlocking the potential to redeem more coupons." />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <CouponIcon />
              </ListItemIcon>
              <ListItemText primary="Redeem your earned points for coupons, enhancing your city exploration with tempting treats and offers." />
            </ListItem>
          </List>
        </Box>

        <Button
                variant="outlined"
                onClick={() => navigate('/')}
                size="large"
                startIcon={<TravelExploreIcon />}
                style={{
                    marginTop: '20px',
                    color: '#4285F4',
                    borderColor: '#4285F4',
                    borderRadius: '50px', // Circular shape
                    textTransform: 'none', // Prevents uppercase transformation
                    padding: '15px 30px', // Increase padding to make the button larger
                    fontSize: '1.2rem',
                    marginBottom: "15px"
                }}
            >
                Start Your Adventure
            </Button>
      </Paper>
    </Container>
  );
}
