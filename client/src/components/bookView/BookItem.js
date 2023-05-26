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
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Availability: {book.quantity} Left</p>
      <div>
        <button onClick={handleDecrease}>-</button>
        <p>{orderedQuantity}</p>
        <button onClick={handleIncrease}>+</button>
      </div>
      <button onClick={handleOrder}>Order</button>
    </div>
  );
}
