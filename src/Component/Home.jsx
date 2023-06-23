import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Home = () => {

  return (
    <>
    <div className="card-container">
          <Card  className="card">
            <CardMedia component="img" height="140" image="https://source.unsplash.com/960x520/?coffee" alt='coffee' />
            <CardContent>
              <Typography variant="h5" component="div">
                Coffee
              </Typography>
              <Typography variant="body2" color="text.secondary">
              This is a description of the coffee variety.
              </Typography>
            </CardContent>
          </Card>
          <Card  className="card">
            <CardMedia component="img" height="140" image="https://source.unsplash.com/960x520/?Tea" alt='coffee' />
            <CardContent>
              <Typography variant="h5" component="div">
                Coffee
              </Typography>
              <Typography variant="body2" color="text.secondary">
              This is a description of the coffee variety.
              </Typography>
            </CardContent>
          </Card>
      </div>
    </>
  );
};

export default Home;
