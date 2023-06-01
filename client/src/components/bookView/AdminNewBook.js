/**
 * Author: William Sparr
 * Date 1st June
 *
 * This component is responsible for adding new books to the book list
 * The component renders a button labeled "Add new book" that, when clicked, opens a popup window.
 * Inside the popup, the user can enter details for a new book, including the title, author, and quantity.
 *
 */

import { useState } from "react";

export function AddNewBook() {
  const [showPopup, setShowPopup] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    quantity: 0,
  });

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  const handleNewBookChange = async (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };
  const handleAddNewBook = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/admin/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
    } else {
      const error = await response.json();
      console.error("Error adding book:", error.error);
    }

    setNewBook({
      title: "",
      author: "",
      quantity: 0,
    });

    togglePopup();
  };

  return (
    <>
      <button className="new-book-btn" onClick={togglePopup}>
        Add new book
      </button>
      {showPopup && (
        <div className="popup" data-testid="add-new-book-popup">
          <div className="popup-content">
            <h2>Add New Book</h2>
            <div className="content-container">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBook.title}
                onChange={handleNewBookChange}
              />
            </div>
            <div className="content-container">
              <label htmlFor="author">Author: </label>
              <input
                type="text"
                id="author"
                name="author"
                value={newBook.author}
                onChange={handleNewBookChange}
              />
            </div>
            <div className="content-container">
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={newBook.quantity}
                onChange={handleNewBookChange}
              />
            </div>
            <div className="popup-buttons">
              <button onClick={handleAddNewBook}>Save</button>
              <button onClick={togglePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
