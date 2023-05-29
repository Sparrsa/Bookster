import { useState, useEffect } from "react";
import { GuestBookItem } from "./GuestBookItem";
import { SearchBook } from "../abstract/SearchBookComponent";
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
      <div className="column-header">
        <h2>Book title</h2>
        <h2>Author</h2>
        <h2>Availability</h2>
      </div>

      {filteredBooks.map((book) => (
        <GuestBookItem key={book.id} book={book} />
      ))}
    </div>
  );
}
