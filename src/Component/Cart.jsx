import React, { useContext } from 'react';
import { Acontext } from '../App';

const Cart = () => {
  const { cartItems, setCartItems} = useContext(Acontext);

  const handleRemoveItem = (itemIndex) => {
    // Create a new array with the item removed
    const updatedCartItems = cartItems.filter((_, index) => index !== itemIndex);

    // Update the cartItems state with the updated array
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
