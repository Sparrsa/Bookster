import React, { useState } from "react";

export function GuestBookItem({ book }) {
  return (
    <div className="book-item">
      <div className="item-container">
        <h2 className="book-title">{book.title}</h2>

        <p className="author">{book.author}</p>
        <p className="availability">{book.quantity} Left</p>
      </div>
    </div>
  );
}
