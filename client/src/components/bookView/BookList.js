/**
 * Author: William Sparr
 * Date 31st May
 *
 * This file handles the functionality of displaying and interacting with a list of books.
 * Overall, this component fetches and displays a list of books, allows users to search for specific books, and provides the functionality to order books if a user is logged in.

 */

import { useState, useEffect } from "react";
import { BookItem } from "./BookItem";
import { SignOut } from "../abstract/SignOutComponent";
import { SearchBook } from "../abstract/SearchComponent";
import jwt_decode from "jwt-decode";

export function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const username = decodedToken.username;
      setLoggedInUser(username);
    }
  }, []);

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
    // window.location.reload();
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
    <div className="library-container">
      <div className="user-field">
        <p className="browser-user">Browsing as {loggedInUser}</p>
        <button className="sign-out-btn" onClick={SignOut}>
          Sign Out
        </button>
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
          <h2 className="column-header">Available</h2>
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
      </div>
    </div>
  );
}
