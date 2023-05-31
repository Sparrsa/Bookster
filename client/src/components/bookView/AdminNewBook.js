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

    // ... perform the API call to add the new book ...
    // Reset the new book form
    const response = await fetch("http://localhost:3000/admin/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      // Book added successfully, handle the response if needed
      const data = await response.json();
      console.log(data); // Log the response data if required
    } else {
      // Error occurred while adding the book, handle the error
      const error = await response.json();
      console.error("Error adding book:", error.error);
    }

    setNewBook({
      title: "",
      author: "",
      quantity: 0,
    });
    // Close the popup
    togglePopup();
  };

  return (
    <>
      <button onClick={togglePopup}>Add new book</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add New Book</h2>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleNewBookChange}
            />
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newBook.author}
              onChange={handleNewBookChange}
            />
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newBook.quantity}
              onChange={handleNewBookChange}
            />
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
