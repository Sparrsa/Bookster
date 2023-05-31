import { useState } from "react";

export function EditBook(book) {
  const [showPopup, setShowPopup] = useState(false);
  const [editBook, setEditBook] = useState({
    title: book.title || "",
    author: book.author || "",
    quantity: book.quantity || 0,
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
      console.log(book);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUpdateStatus({
          success: true,
          message: data.message,
        });
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
      <button onClick={togglePopup}>Edit</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Book {book.title}</h2>
            {updateStatus && (
              <div className={updateStatus.success ? "success" : "error"}>
                {updateStatus.message}
              </div>
            )}
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editBook.title}
              onChange={handleEditedBookChange}
              placeholder={book.book.title}
            />
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={editBook.author}
              onChange={handleEditedBookChange}
              placeholder={book.book.author}
            />
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={editBook.quantity}
              onChange={handleEditedBookChange}
              placeholder={book.book.quantity}
            />
            <div className="popup-buttons">
              <button onClick={() => handleEditBook(book.book)}>Save</button>
              <button onClick={togglePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
