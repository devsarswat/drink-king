import React, { useContext } from 'react';
import { Acontext } from '../App';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(Acontext);

  const handleRemoveItem = (itemIndex) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const itemPrice = parseFloat(item.price);
      totalPrice += itemPrice;
    });
    return totalPrice.toFixed(2);
  };

  const renderCartItems = () => {
    const uniqueItems = {};
    cartItems.forEach((item) => {
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
          <Button variant="contained" color="primary" className="buy-now-button my-2 mx-2">
            Buy Now
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="add-to-cart-button"
            onClick={() => handleRemoveItem(index)}
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
              <Typography variant="body2" color="text.secondary" >
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
          <Typography variant="body2"  className='Text-price-1'>
              PRICE DETAILS
            </Typography>
            <Typography variant="body2"  className='Text-price'>
              Total Items: {cartItems.length}
            </Typography>
            <Typography variant="body2"  className='Text-price'>
              Total Price: ₹ {calculateTotalPrice()}
            </Typography>
            <Button variant="contained" color="warning" className="Place-Order-button my-2">
            Place Order
          </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
