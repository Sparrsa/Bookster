import React, { useState, useEffect } from "react";
import { SearchUser } from "../abstract/SearchComponent";

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/admin/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setUsers(data.users);
  };

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
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
    }
  };

  const handlePromoteUser = async (user) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/admin/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ username: user.username }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.username === user.username ? { ...u, role: "ADMIN" } : u
        )
      );
    } else {
      const error = await response.json();
      console.error("Error promoting user:", error.error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <>
      <SearchUser searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="column-container">
        <div className="column">
          <h2 className="column-header">Username</h2>
          {filteredUsers.map((user) => (
            <p className="column-item" key={user.username}>
              {user.username}
            </p>
          ))}
        </div>
        <div className="column">
          <h2 className="column-header">Role</h2>
          {filteredUsers.map((user) => (
            <p className="column-item" key={user.username}>
              {user.role}
            </p>
          ))}
        </div>
        <div className="column">
          <h2 className="column-header">Purchases</h2>
          {filteredUsers.map((user) => (
            <div className="column-item" key={user.username}>
              {user.purchases && user.purchases.length > 0 ? (
                <p>
                  {user.purchases.reduce(
                    (total, purchase) => total + purchase.quantity,
                    0
                  )}{" "}
                  purchases
                </p>
              ) : (
                <p>No purchases</p>
              )}
            </div>
          ))}
        </div>

        <div className="column">
          <h2 className="column-header">Action</h2>
          {filteredUsers.map((user) => (
            <div className="column-item" key={user.username}>
              <button onClick={() => handleDeleteUser(user)}>Delete</button>
              {user.role !== "admin" ? (
                <button onClick={() => handlePromoteUser(user)}>Promote</button>
              ) : (
                <button disabled>Admin</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
