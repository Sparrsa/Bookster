/**
 * /**
 * Author: William Sparr
 * Date 31st May
 * The BookItem component represents an individual book item in the book list.
 *  It provides functionality to decrease/increase the quantity of books to order, and allows the user to place an order for the specified quantity of the book.
 */

import React, { useState } from "react";

export function BookItem({ book, handleOrderBook }) {
  const [orderedQuantity, setOrderedQuantity] = useState(0);

  const handleDecrease = () => {
    if (orderedQuantity > 0) {
      setOrderedQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncrease = () => {
    setOrderedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleOrder = () => {
    if (orderedQuantity > 0) {
      handleOrderBook({ ...book, quantity: orderedQuantity });
      setOrderedQuantity(0);
    }
  };

  return (
    <div className="column-item">
      <div className="order-container">
        <div className="amount-btn-container">
          <button className="amount-btn" onClick={handleDecrease}>
            -
          </button>
          <p className="ordered-quantity">{orderedQuantity}</p>
          <button className="amount-btn" onClick={handleIncrease}>
            +
          </button>
        </div>
        <div className="order-btn-container">
          <button onClick={handleOrder} className="order-btn">
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
