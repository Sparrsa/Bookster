/**
 * Author: William Sparr
 * Date: 1st June
 *
 *  This component provides functionality to edit a book's details.
 *  It renders an "Edit" button that, when clicked, opens a popup window. Inside the popup, the admin can modify the title, author, and quantity of the book. The component communicates with the server to update the book details.
 */

import { useState } from "react";

export function EditBook(bookObject) {
  const [showPopup, setShowPopup] = useState(false);
  const [editBook, setEditBook] = useState({
    title: bookObject.title || "",
    author: bookObject.author || "",
    quantity: bookObject.quantity || 0,
  });
  const [updateStatus, setUpdateStatus] = useState(null);

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  const handleEditedBookChange = (event) => {
    const { name, value } = event.target;
    setEditBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleEditBook = async (selectedBook) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`http://localhost:3000/admin/books`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          previous: {
            title: selectedBook.title,
            author: selectedBook.author,
            quantity: selectedBook.quantity,
          },
          current: {
            title: editBook.title,
            author: editBook.author,
            quantity: editBook.quantity,
          },
        }),
      });
      console.log(bookObject);

      if (response.ok) {
        window.location.reload();
      } else {
        const error = await response.json();
        setUpdateStatus({ success: false, message: error.error });
      }
    } catch (error) {
      setUpdateStatus({
        success: false,
        message: "An error occurred while updating the book.",
      });
    }
  };

  return (
    <>
      <button className="action-btn" onClick={togglePopup}>
        Edit
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Book {bookObject.book.title}</h2>
            <div className="content-container">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={editBook.title}
                onChange={handleEditedBookChange}
                placeholder={bookObject.book.title}
              />
            </div>
            <div className="content-container">
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={editBook.author}
                onChange={handleEditedBookChange}
                placeholder={bookObject.book.author}
              />
            </div>
            <div className="content-container">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={editBook.quantity}
                onChange={handleEditedBookChange}
                placeholder={bookObject.book.quantity}
              />
            </div>
            {updateStatus && (
              <div className={updateStatus.success ? "success" : "error"}>
                {updateStatus.message}
              </div>
            )}
            <div className="popup-buttons">
              <button onClick={() => handleEditBook(bookObject.book)}>
                Save
              </button>
              <button onClick={togglePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
