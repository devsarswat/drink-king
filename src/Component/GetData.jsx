import React, { useState ,useContext,useEffect} from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import data from '../Data/CoffeeData.json';
import { Acontext } from "../App";

const ITEMS_PER_PAGE = 6;

const GetData = () => {
  const { search } = useContext(Acontext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVarieties, setFilteredVarieties] = useState([]);

  useEffect(() => {
    const searchQuery = search ? search.toString().toLowerCase() : '';

    const filteredData = data.varieties.filter((variety) =>
      variety.name.toLowerCase().includes(searchQuery)
    );

    setFilteredVarieties(filteredData);
    setCurrentPage(1);
  }, [search]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedVarieties = filteredVarieties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="Sbar">
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
              <Typography variant="body2" color="text.secondary my-2">
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
