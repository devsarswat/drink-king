import React, { useContext, useEffect } from "react";
import { Acontext } from "../App";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import Config from "../Config";
import Footer from "./Footer";
import { v4 as uuidv4 } from 'uuid';

const ProductDetail = () => {
  const { product, setCartItems, user } = useContext(Acontext);

  const handleAddToCart = (product) => {
    const usercart = { userid: user.id, ...product };
    axios
      .post(Config.apikeycart, usercart)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };
  const handleBuynow=(displayedProduct)=>{
    const currentDate = new Date();
  const usercart = { id: uuidv4(), userid: user.id, date: currentDate, ...displayedProduct };
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

  const calculateDiscountedPrice = () => {
    const discountPercentage = displayedProduct.discount || 0;
    const discount = (displayedProduct.price * discountPercentage) / 100;
    return displayedProduct.price - discount;
  };

  useEffect(() => {
    if (product) {
      localStorage.setItem("product", JSON.stringify(product));
    }
  }, [product]);

  const storedProduct = JSON.parse(localStorage.getItem("product"));

  const displayedProduct = product ? product : storedProduct;

  return (
    <>
    <div className="product-detail">
      <div className="product-image">
        <img src={displayedProduct.image} alt={displayedProduct.name} height={300} width={400}/>
      </div>
      <div className="product-info">
        <Typography variant="h2" component="h2">
          {displayedProduct.name}
        </Typography>
        <Typography variant="body1" className="product-description">
          {displayedProduct.description}
        </Typography>
        <div className="product-details">
          <Typography variant="body2" className="product-origin">
            Origin: {displayedProduct.origin}
          </Typography>
          <Typography variant="body2" className="product-strength">
            Strength: {displayedProduct.strength}
          </Typography>
          {displayedProduct.discount && (
            <>
              <Typography variant="body2" className="product-discount">
                <span style={{ fontSize: "20px", color: "red" }}>
                  -{displayedProduct.discount}%{" "}
                </span>{" "}
                ₹{calculateDiscountedPrice()}
              </Typography>
            </>
          )}
          {displayedProduct.discount ? (
            <Typography variant="body2" className="product-price">
              Price:{" "}
              <span style={{ textDecoration: "line-through" }}>
                ₹{displayedProduct.price}
              </span>
            </Typography>
          ) : (
            <Typography variant="body2" className="product-price">
              Price: ₹{displayedProduct.price}
            </Typography>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          className="buy-now-button my-2"
          onClick={() => handleBuynow(displayedProduct)}
        >
          Buy Now
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="add-to-cart-button"
          onClick={() => handleAddToCart(displayedProduct)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
    <Footer/> </>
  );
};

export default ProductDetail;
