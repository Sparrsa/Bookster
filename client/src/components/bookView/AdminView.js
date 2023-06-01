/**
 * Author: William Sparr
 * Date 1st June
 *
 * This component renders the admin view of the page.
 * It fetches and displays a list of books and users, allows the admin to search for books, switch between viewing books and users.
 * It checks if the logged-in user has admin privileges and handles the display of components based on the selected view mode.
 */

import { useState, useEffect } from "react";
import { SignOut } from "../abstract/SignOutComponent";
import jwt_decode from "jwt-decode";

import { AdminUsers } from "./AdminUsers";
import { AdminBooks } from "./AdminBooks";
import { AddNewBook } from "./AdminNewBook";

export function AdminView() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("books");
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleAdminCheck = () => {
    const accessToken = localStorage.getItem("accessToken");

    const decodedToken = jwt_decode(accessToken);
    const userRole = decodedToken.role;
    console.log(userRole);

    if (userRole === "USER") {
      localStorage.removeItem("accessToken");
      window.location.reload();
    }
  };

  handleAdminCheck();

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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const username = decodedToken.username;
      setLoggedInUser(username);
    }
  }, []);

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
        <p className="browser-user">Browsing as {loggedInUser}</p>
        <button className="sign-out-btn" onClick={SignOut}>
          Sign Out
        </button>
      </div>

      <div className="view-mode-container">
        <div className="new-book-container">
          <AddNewBook />
        </div>
        <button
          className="view-mode-btn"
          onClick={() => handleViewModeChange("books")}>
          Books
        </button>
        <button
          className="view-mode-btn"
          onClick={() => handleViewModeChange("users")}>
          Users
        </button>
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
