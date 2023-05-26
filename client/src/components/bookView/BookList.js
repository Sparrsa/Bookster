import { useState, useEffect } from "react";
import { BookItem } from "./BookItem";
import { SignOut } from "../abstract/SignOutComponent";
import { SearchBook } from "../abstract/SearchBookComponent";

export function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    const response = await fetch("http://localhost:3000/library/books", {
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = searchQuery
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  return (
    <div>
      <h1>Bookster</h1>
      <SearchBook searchQuery={searchQuery} handleSearch={handleSearch} />
      {filteredBooks.map((book) => (
        <BookItem key={book.id} book={book} handleOrderBook={handleOrderBook} />
      ))}
      <div>
        <p>Browsing as user </p>
        <button onClick={SignOut}>Sign Out</button>
      </div>
    </div>
  );
}
