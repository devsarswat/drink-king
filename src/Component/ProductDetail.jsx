import React, { useContext, useEffect } from "react";
import { Acontext } from "../App";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import Config from "../Config";
import Footer from "./Footer";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { product, setCartItems, user, isLogin } = useContext(Acontext);
  const nevigate = useNavigate();

  const handleAddToCart = (product) => {
    const currentDate = new Date();
    const generatedUuid = uuidv4();
    const truncatedUuid = generatedUuid.slice(0, 5);
    const usercart = {
      id: truncatedUuid,
      userid: user.id,
      date: currentDate,
      ...displayedProduct,
    };
    axios
      .post(Config.apikeycart, usercart)
      .then((res) => {
        console.log(res);
        toast.success("Product Added to Cart")
      })
      .catch((error) => {
        console.log(error);
        toast.error("Pleas Try Again")
      });
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };
  const handleBuynow = (displayedProduct) => {
    const currentDate = new Date();
    const generatedUuid = uuidv4();
    const truncatedUuid = generatedUuid.slice(0, 5);
    const usercart = {
      id: truncatedUuid,
      userid: user.id,
      date: currentDate,
      ...displayedProduct,
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
          className="btn btn-outline mx-2"
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
          <img
            src={displayedProduct.image}
            alt={displayedProduct.name}
            height={300}
            width={400}
          />
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
            onClick={
              isLogin
                ? () => handleBuynow(displayedProduct)
                : () => nevigate("/login")
            }
          >
            Buy Now
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="add-to-cart-button"
            onClick={() => handleAddToCart(displayedProduct)}
            disabled={!isLogin}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
