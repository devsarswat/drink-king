import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Acontext } from '../App';
import axios from 'axios';

const ITEMS_PER_PAGE = 6;

const Data = () => {
  const { search, setCartItems } = useContext(Acontext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVarieties, setFilteredVarieties] = useState([]);
  const [sortType, setSortType] = useState(null);
  const { data } = useContext(Acontext);
 

  useEffect(() => {
    const searchQuery = search ? search.toString().toLowerCase() : '';

    let filteredData = data.filter(variety =>
      variety.name.toLowerCase().includes(searchQuery)
    );

    if (sortType) {
      filteredData = filteredData.filter(variety => variety.strength === sortType);
    }

    setFilteredVarieties(filteredData);
    setCurrentPage(1);
  }, [search, sortType, data]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleSort = type => {
    setSortType(prevSortType => (prevSortType === type ? null : type));
  };

  const handleAddToCart = (variety) => {
    axios
    .post('http://localhost:4000/cart',variety)
    .then((res)=>{
      console.log(res)
    })
    .catch((error)=>{
      console.log(error);
    })
    setCartItems(prevCartItems => [...prevCartItems, variety]);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedVarieties = filteredVarieties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="Sbar">
      <div className="d-flex justify-content-center">
        <div className="button-container">
          <Button
            variant="contained"
            color="warning"
            className={sortType === 'Light' ? 'active-button' : ''}
            onClick={() => handleSort('Light')}
            style={{ margin: 10 }}
          >
            Light
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={sortType === 'Medium' ? 'active-button' : ''}
            onClick={() => handleSort('Medium')}
            style={{ margin: 10 }}
          >
            Medium
          </Button>
          <Button
            variant="contained"
            color="warning"
            className={sortType === 'Strong' ? 'active-button' : ''}
            onClick={() => handleSort('Strong')}
          >
            Strong
          </Button>
        </div>
      </div>

      <div className="card-container">
        {displayedVarieties.map((variety, index) => (
          <Card key={index} className="card">
            <CardMedia component="img" height="140" image={variety.image} alt={variety.name} />
            <CardContent>
              <Typography variant="h5" component="div">
                {variety.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {variety.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="my-2">
                Price: {variety.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="buy-now-button my-2 mx-2"
              >
                Buy Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className="add-to-cart-button"
                onClick={() => handleAddToCart(variety)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pagination-container">
        {Array.from(
          { length: Math.ceil(filteredVarieties.length / ITEMS_PER_PAGE) },
          (_, index) => (
            <Button
              key={index}
              variant={index + 1 === currentPage ? 'contained' : 'outlined'}
              onClick={() => handlePageChange(index + 1)}
              className="pagination-button"
            >
              {index + 1}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Data;
