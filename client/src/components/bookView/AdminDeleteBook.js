// import React, { useState } from "react";

// export function DeleteBook({ book, setBooks }) {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleDeleteBook = async () => {
//     const accessToken = localStorage.getItem("accessToken");

//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         `http://localhost:3000/admin/books/${book.id}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify(book),
//         }
//       );

//       if (response.ok) {
//         // Update the books state to reflect the deletion
//         setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
//         console.log("Book deleted successfully.");
//       } else {
//         const error = await response.json();
//         console.error("Error deleting book:", error.error);
//       }
//     } catch (error) {
//       console.error("Error deleting book:", error);
//     }

//     setIsLoading(false);
//   };

//   return (
//     <button
//       className="action-btn"
//       onClick={handleDeleteBook}
//       disabled={isLoading}>
//       {isLoading ? "Deleting..." : "Delete"}
//     </button>
//   );
// }
