import { useState, useEffect } from "react";
import { BookItem } from "./BookItem";
import { Navigate } from "react-router-dom";

export function BookList() {
  const [books, setBooks] = useState([]);

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

  const handleOrderBook = async (book) => {
    const response = await fetch("http://localhost:3000/library/buyBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: book.title, quantity: book.quantity }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      const error = await response.json();
      console.error("Error ordering book:", error.error);
    }
  };

  const handleSignOut = async () => {
    // göra test, flytta sign out logik till en egen komponent
    localStorage.removeItem("accessToken");
    window.location.reload();

    // return <Navigate to="/login" />;
  };

  return (
    <div>
      <h1>Bookster</h1>
      {books.map((book) => (
        <BookItem key={book.id} book={book} handleOrderBook={handleOrderBook} />
      ))}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
