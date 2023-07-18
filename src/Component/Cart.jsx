import React, { useContext, useEffect, useState } from "react";
import { Acontext } from "../App";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import axios from "axios";
import Config from "../Config";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

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
    const currentDate = new Date();
    const generatedUuid = uuidv4();
    const truncatedUuid = generatedUuid.slice(0, 5);
    const usercart = {
      id: truncatedUuid,
      userid: user.id,
      date: currentDate,
      ...variety,
    };
  
    toast(
      <div>
        <p>Are you sure to order this product?</p>
        <button
          onClick={() => {
            axios
              .post(Config.apikeyorder, usercart)
              .then((res) => {
                console.log(res);
                toast.success("Your product added successfully");
              })
              .catch((error) => {
                console.log(error);
                toast.error("Pleas Try Again")
              });
            toast.dismiss();
          }}
          className="btn btn-primary"
        >
          Yes
        </button>
        <button
          onClick={() => {
            console.log("Product addition canceled");
            toast.dismiss();
          }}
          className="btn btn-secondary mx-2"
        >
          Cancel
        </button>
      </div>,
      {
        closeButton: false,
        hideProgressBar: true,
        draggable: false,
        pauseOnHover: true,
        autoClose: false,
      }
    );
  };
  const handleOrder = async () => {
    try {
      const orderResponses = [];
      const deleteResponses = [];
  
      for (const item of filteredItems) {
        const currentDate = new Date();
        const itemWithDate = { ...item, date: currentDate };
  
        const orderResponse = await axios.post(
          Config.apikeyorder,
          itemWithDate
        );
        orderResponses.push(orderResponse);
      }
  
      console.log(orderResponses);
  
      toast(
        <div>
          <p>Are you sure to order all these products?</p>
          <button
            onClick={async () => {
              toast.dismiss();
              const confirmation = await new Promise((resolve) => {
                resolve(true);
              });
  
              if (!confirmation) {
                return; // If the user clicks "Cancel", exit the function
              }
  
              toast.success("Your products were added successfully");
  
              for (const item of filteredItems) {
                const deleteResponse = await axios.delete(
                  `${Config.apikeycart}/${item.id}`
                );
                deleteResponses.push(deleteResponse);
              }
  
              console.log(deleteResponses);
              setFilteredItems([]);
            }}
            className="btn btn-primary"
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast.dismiss();
            }}
            className="btn btn-secondary mx-2"
          >
            Cancel
          </button>
        </div>,
        {
          closeButton: false,
          hideProgressBar: true,
          draggable: false,
          pauseOnHover: true,
          autoClose: false,
        }
      );
    } catch (error) {
      console.log(error);
    }
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
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt={item.name}
        />
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
            onClick={() => handleBuyNow(item)}
          >
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
        <Card sx={{ display: "flex", flexDirection: "column" }}>
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
            <Button
              variant="contained"
              color="warning"
              className="Place-Order-button my-2"
              onClick={handleOrder}
            >
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
