import React, { useContext, useEffect } from "react";
import { Acontext } from "../App";
import { Button, Typography } from "@mui/material";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import BuyNowButton from "./Action/BuyNowButton";
import AddToCartButton from "./Action/AddToCartButton";

const ProductDetail = () => {
  const { product, setCartItems, user, isLogin } = useContext(Acontext);
  const nevigate = useNavigate();


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
          {isLogin ? (
            <BuyNowButton
              user={user}
              variety={displayedProduct}
              variant="contained"
              color="primary"
              className="buy-now-button my-2"
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="buy-now-button my-2"
              onClick={() => nevigate("/login")}
            >
              Buy Now
            </Button>
          )}
          <AddToCartButton user={user} variety={displayedProduct} setCartItems={setCartItems} disabled={!isLogin} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
