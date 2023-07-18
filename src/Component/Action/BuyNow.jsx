import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../Config';

const BuyNow = ( variety ) => {
  const handleOrder = () => {
    const currentDate = new Date();
    const generatedUuid = uuidv4();
    const truncatedUuid = generatedUuid.slice(0, 5);
    const usercart = {
      id: truncatedUuid,
    //   userid: user.id,
      date: currentDate,
      ...variety,
    };

    axios
      .post(Config.apikeyorder, usercart)
      .then((res) => {
        console.log(res);
        toast.success("Your product added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    console.log("Product addition canceled");
  };

  const showConfirmation = () => {
    toast(
      <div>
        <p>Are you sure to order this product?</p>
        <button onClick={handleOrder} className="btn btn-primary">
          Yes
        </button>
        <button onClick={handleCancel} className="btn btn-secondary mx-2">
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

  return (
    <div>
      <button onClick={showConfirmation}>Buy Now</button>
    </div>
  );
};

export default BuyNow;
