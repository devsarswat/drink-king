import React, { useContext, useEffect, useState } from 'react';
import { Acontext } from '../App';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import axios from 'axios';
import Config from '../Config';

const Cart = () => {
  const { cartItems, setCartItems, user } = useContext(Acontext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axios
      .get(Config.apikeycart)
      .then((res) => {
        console.log(res.data);
        setCartItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setCartItems, user]);

  useEffect(() => {
    const filteredItems = cartItems.filter((item) => item.userid === user.id);
    setFilteredItems(filteredItems);

    let calculatedTotalPrice = 0;
    filteredItems.forEach((item) => {
      const itemPrice = parseFloat(item.price);
      calculatedTotalPrice += itemPrice;
    });
    setTotalPrice(calculatedTotalPrice.toFixed(2));
    setItemCount(filteredItems.length);
  }, [cartItems, user]);

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);

    axios
      .delete(`${Config.apikeycart}/${itemId}`)
      .then((res) => {
        console.log(res);
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBuyNow = (variety) => {
    const usercart = { userid: user.id, ...variety };
    axios
      .post(Config.apikeyorder, usercart)
      .then((res) => {
        console.log(res);
        alert("Your product was added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOrder = () => {
    axios
      .post(Config.apikeyorder, filteredItems)
      .then((res) => {
        console.log(res);
        alert("Your products were added successfully");
        const deletePromises = filteredItems.map((item) => {
          return axios.delete(`${Config.apikeycart}/${item.id}`);
          
        });

        Promise.all(deletePromises)
          .then((res) => {
            console.log(res);
            setFilteredItems([]);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderCartItems = () => {
    const uniqueItems = {};
    filteredItems.forEach((item) => {
      if (!uniqueItems[item.name]) {
        uniqueItems[item.name] = { ...item, quantity: 1 };
      } else {
        uniqueItems[item.name].quantity += 1;
      }
    });

    return Object.values(uniqueItems).map((item, index) => (
      <Card key={index} className="card">
        <CardMedia component="img" height="140" image={item.image} alt={item.name} />
        <CardContent>
          <Typography variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="my-2">
            Price: {item.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="my-2">
            Quantity: {item.quantity}
          </Typography>
          <Button variant="contained" color="primary" className="buy-now-button my-2 mx-2" onClick={() => handleBuyNow(item)}>
            Buy Now
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="add-to-cart-button"
            onClick={() => handleRemoveItem(item.id)}
          >
            Remove
          </Button>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="page-container">
      <div className="card-container-e">
        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h4" component="div">
              Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Your cart is empty.
              </Typography>
            ) : (
              <div className="card-content">{renderCartItems()}</div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="total-section">
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography variant="body2" className="Text-price-1">
              PRICE DETAILS
            </Typography>
            <Typography variant="body2" className="Text-price">
              Total Items: {itemCount}
            </Typography>
            <Typography variant="body2" className="Text-price">
              Total Price: ₹ {totalPrice}
            </Typography>
            <Button variant="contained" color="warning" className="Place-Order-button my-2" onClick={handleOrder}>
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
