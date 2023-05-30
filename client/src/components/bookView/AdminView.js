import { useState, useEffect } from "react";
import { BookItem } from "./BookItem";
import { SignOut } from "../abstract/SignOutComponent";
import { SearchBook } from "../abstract/SearchBookComponent";

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

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/users");
        const data = await response.json();
        console.log(data);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (viewMode === "books") {
      fetchBooks();
    } else if (viewMode === "users") {
      fetchUsers();
    }
  }, [viewMode]);

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

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
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
      const data = await response.json();
      console.log(data.message);
      // Update the books state to reflect the deletion
      setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
    } else {
      const error = await response.json();
      console.error("Error deleting book:", error.error);
    }
  };

  const handleEditBook = async (book) => {
    // Implement edit book functionality
    console.log("Edit book:", book);
  };

  const handleDeleteUser = async (user) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/admin/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      // Update the users state to reflect the deletion
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.username !== user.username)
      );
    } else {
      const error = await response.json();
      console.error("Error deleting user:", error.error);
    }
  };

  const handlePromoteUser = async (user) => {
    const response = await fetch("http://localhost:3000/admin/users/promote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      // Update the users state to reflect the promotion
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.username === user.username ? { ...u, role: "admin" } : u
        )
      );
    } else {
      const error = await response.json();
      console.error("Error promoting user:", error.error);
    }
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
                  <button
                    className="action-btn"
                    onClick={() => handleEditBook(book)}>
                    Edit
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => handleDeleteBook(book)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {viewMode === "users" && (
        <>
          <div className="column-container">
            <h2 className="column-header">Username</h2>
            <h2 className="column-header">Role</h2>
            <h2 className="column-header">Purchase History</h2>
            <h2 className="column-header">Action</h2>
          </div>
          {users.map((user) => (
            <div key={user.username} className="user-row">
              <p>{user.username}</p>
              <p>{user.role}</p>
              <p>{user.purchaseHistory.join(", ")}</p>
              <div>
                <button onClick={() => handleDeleteUser(user)}>Delete</button>
                {user.role !== "admin" && (
                  <button onClick={() => handlePromoteUser(user)}>
                    Promote
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
