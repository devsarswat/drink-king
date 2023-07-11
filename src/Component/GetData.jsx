import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Acontext } from '../App';
import axios from 'axios';
import Popup from './Popup';
import Config from '../Config';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const ITEMS_PER_PAGE = 6;

const GetData = () => {
  const { search, setCartItems ,isLogin,user,setproduct} = useContext(Acontext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVarieties, setFilteredVarieties] = useState([]);
  const [sortType, setSortType] = useState(null);
  const[data,setdata]=useState([]);
  const[selectedcard,setselectedcard]=useState();
 const nevigate=useNavigate();


 useEffect(()=>{
  axios
  .get(Config.apikeydata)
  .then((res)=>{
    console.log((res.data.Teadata),(res.data.varieties))
    setdata([...(res.data.Teadata),...(res.data.varieties)]);
  })
 },[setdata])

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
    const usercart = { id: uuidv4(), userid: user.id, ...variety };
    axios
    .post(Config.apikeycart,usercart)
    .then((res)=>{
      console.log(res)
    })
    .catch((error)=>{
      console.log(error);
    })
    setCartItems(prevCartItems => [...prevCartItems, variety]);
  };
  const handleBuynow=(variety)=>{
    const currentDate = new Date();
  const usercart = { id: uuidv4(), userid: user.id, date: currentDate, ...variety };
    axios
    .post(Config.apikeyorder,usercart)
    .then((res)=>{
      console.log(res)
      alert("your Product added Successfully")
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedVarieties = filteredVarieties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleOpenPopup=(variety)=>{
    setselectedcard(variety)
  }
  const handleClosePopup = () => {
    setselectedcard(null);
  };
const handlePeoduct=(variety)=>{
  setproduct(variety);
  nevigate('/productdetail')
}

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

      <div className="card-container" >
        {displayedVarieties.map((variety, index) => (
          <Card key={index} className="card" >
            <CardMedia component="img" height="140" image={variety.image} alt={variety.name} onClick={()=>handleOpenPopup(variety)}/>
            <CardContent>
            <div onClick={()=>handlePeoduct(variety)}>
            <Typography variant="h5" component="div">
                {variety.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {variety.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="my-2">
              <span style={{fontWeight :'bold',color:'black',fontSize:'15px'}}>₹ {variety.price}</span>
              </Typography>
            </div>
              
              <Button
                variant="contained"
                color="primary"
                className="buy-now-button my-2 mx-2"
                onClick={() => handleBuynow(variety)}
              >
                Buy Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className="add-to-cart-button"
                disabled={!isLogin}
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
      <Popup variety={selectedcard} onClose={handleClosePopup} />
    </div>
    
  );
};

export default GetData;
