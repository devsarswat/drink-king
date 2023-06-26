import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import cdata from '../Data/CoffeeData.json';
import { Acontext } from '../App';
import { useNavigate } from 'react-router-dom';

const  Product = () => {
  const navigate = useNavigate();
  const { setdata } = useContext(Acontext);
  

  const handleCoffee = () => {
    setdata(cdata.varieties);
    navigate('/data');
    console.log(cdata.varieties)
  };

  const handleTea = () => {
    setdata(cdata.Teadata);
    navigate('/data');
    console.log(cdata.Teadata)
  };

  return (
    <>
      <div className="card-container">
        <Card className="card" onClick={handleCoffee}>
          <CardMedia
            component="img"
            height="140"
            image="https://source.unsplash.com/960x520/?coffee"
            alt="coffee"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Coffee
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a description of the coffee variety.
            </Typography>
          </CardContent>
        </Card>
        <Card className="card" onClick={handleTea}>
          <CardMedia
            component="img"
            height="140"
            image="https://source.unsplash.com/960x520/?Tea"
            alt="tea"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Tea
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a description of the tea variety.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default  Product;
