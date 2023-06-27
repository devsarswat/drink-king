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
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  return (
    <div className="page-container">
      <div className="card-container">
        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Your cart is empty.
              </Typography>
            ) : (
              <div className="card-content">
                {cartItems.map((item, index) => (
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
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="total-section">
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Items: {cartItems.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Price: {calculateTotalPrice()}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
