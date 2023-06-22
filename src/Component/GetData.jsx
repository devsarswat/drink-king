import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField } from '@mui/material';
import data from '../Data/CoffeeData.json';


const ITEMS_PER_PAGE = 6;

const GetData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset the current page when the search query changes
  };

  const filteredVarieties = data.varieties.filter((variety) =>
    variety.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedVarieties = filteredVarieties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className='Sbar'>
      <div className="search-bar-container">
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <div className="card-container">
        {displayedVarieties.map((variety, index) => (
          <Card key={index} className="card">
            <CardMedia
              component="img"
              height="140"
              image={variety.image}
              alt={variety.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {variety.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {variety.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origin: {variety.origin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Strength: {variety.strength}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {variety.price}
              </Typography>
              <Button variant="contained" color="primary" className="buy-now-button my-2 mx-2">
                Buy Now
              </Button>
              <Button variant="outlined" color="primary" className="add-to-cart-button">
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

export default GetData;
