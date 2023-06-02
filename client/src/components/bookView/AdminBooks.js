/**
 *  Author: William Sparr
    Date: 1st June

    This component renders the list of books in the admin view. 
    It fetches the books from the server and it provides functionality to order books, delete books, and edit book details.
    The component utilizes child components to handle specific book-related actions.
 */

import { BookItem } from "./BookItem";
import { EditBook } from "./AdminEditBook";
import { useState, useEffect } from "react";
import { SearchBook } from "../abstract/SearchComponent";
import { DeleteBookPopup } from "./Popup";

export function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/library/books");
      const data = await response.json();
      setBooks(data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleOrderBook = async (book) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/library/user/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title: book.title, quantity: book.quantity }),
    });

    if (response.ok) {
      setBooks((prevBooks) =>
        prevBooks.map((prevBook) =>
          prevBook.title === book.title
            ? { ...prevBook, quantity: prevBook.quantity - 1 }
            : prevBook
        )
      );
    } else {
      const error = await response.json();
      console.error("Error ordering book:", error.error);
    }
  };

  const handleDeleteBook = async (book) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/admin/books", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(book),
    });

    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((b) => b.title !== book.title));
    } else {
      const error = await response.json();
      console.error("Error deleting book:", error.error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = searchQuery
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  return (
    <>
      <SearchBook searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="column-container">
        <div className="column">
          <h2 className="column-header">Book Title</h2>
          {filteredBooks.map((book) => (
            <p className="column-item" key={book.id}>
              {book.title}
            </p>
          ))}
        </div>
        <div className="column">
          <h2 className="column-header">Author</h2>
          {filteredBooks.map((book) => (
            <p className="column-item" key={book.id}>
              {book.author}
            </p>
          ))}
        </div>
        <div className="column">
          <h2 className="column-header">Availability</h2>
          {filteredBooks.map((book) => (
            <p className="column-item" key={book.id}>
              {book.quantity} Left
            </p>
          ))}
        </div>
        <div className="column">
          <h2 className="column-header">Order</h2>
          {filteredBooks.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              handleOrderBook={handleOrderBook}
            />
          ))}
        </div>
        <div className="column">
          <h2 className="column-header">Action</h2>
          {filteredBooks.map((book) => (
            <div className="column-item" key={book.id}>
              <EditBook book={book} />

              <DeleteBookPopup
                book={book}
                handleDeleteBook={handleDeleteBook}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
