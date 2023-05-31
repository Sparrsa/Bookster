import { useState, useEffect } from "react";
import { SignOut } from "../abstract/SignOutComponent";

import { AdminUsers } from "./AdminUsers";
import { AdminBooks } from "./AdminBooks";

export function AdminView() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("books");

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
  }, [viewMode]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const filteredBooks = searchQuery
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  return (
    <div className="library-container">
      <div className="user-field">
        <p>Browsing as Admin</p>
        <button onClick={SignOut}>Sign Out</button>
      </div>
      <div>
        <button onClick={() => handleViewModeChange("books")}>Books</button>
        <button onClick={() => handleViewModeChange("users")}>Users</button>
      </div>
      {viewMode === "books" && (
        <>
          <AdminBooks books={filteredBooks} />
        </>
      )}
      {viewMode === "users" && <AdminUsers users={users} />}
    </div>
  );
}
