/**
 * Author: William Sparr
 * Date 1st June
 *
 * The components in this file are responsible for rendering pop-up windows with confirmation dialogs for deleting books and users or promoting users to the admin role.
 *
 *
 */

import { useState } from "react";

export function DeleteBookPopup({ book, handleDeleteBook }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  const confirmDelete = () => {
    handleDeleteBook(book);
    togglePopup();
  };

  return (
    <>
      <button className="action-btn" onClick={togglePopup}>
        Delete
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Delete Book</h2>
            <p>Are you sure you want to delete the book "{book.title}"?</p>
            <div className="popup-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={togglePopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function DeleteUserPopup({ user, handleDeleteUser }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  const confirmDelete = () => {
    handleDeleteUser(user);
    togglePopup();
  };

  return (
    <>
      <button onClick={togglePopup}>Delete</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Delete User</h2>
            <p>Are you sure you want to delete the user "{user.username}"?</p>
            <div className="popup-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={togglePopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function PromoteUserPopup({ user, handlePromoteUser }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  const confirmPromote = () => {
    handlePromoteUser(user);
    togglePopup();
  };

  return (
    <>
      <button onClick={togglePopup}>Promote</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Promote User</h2>
            <p>
              Are you sure you want to promote the user "{user.username}" to the
              ADMIN role?
            </p>
            <div className="popup-buttons">
              <button onClick={confirmPromote}>Yes</button>
              <button onClick={togglePopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
