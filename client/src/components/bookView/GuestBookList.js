/**
 * Author: William Sparr
 * Date: 31st May
 *
 * The GuestBookList component represents a book list view for guest users.
 *  It fetches and displays a list of books, allows users to search for books, and provides an option to sign in by navigating to the login page.
 */

import { useState, useEffect } from "react";
import { SearchBook } from "../abstract/SearchComponent";
import { useNavigate } from "react-router-dom";

export function GuestBookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/library/books");
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = searchQuery
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  return (
    <div className="library-container">
      <div className="user-field">
        <p>Browsing as guest..</p>
        <button onClick={() => navigate("/login")}>Sign in!</button>
      </div>
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
              {book.quantity}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
