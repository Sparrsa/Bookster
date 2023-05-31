// import { useState } from "react";

// export function DeleteUser() {
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const handleDeleteUser = async (user) => {
//     setSelectedUser(user);
//     setShowConfirmation(true);
//   };

//   const confirmDeleteUser = async (user) => {
//     setShowConfirmation(false);

//     const accessToken = localStorage.getItem("accessToken");

//     const response = await fetch("http://localhost:3000/admin/users", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(user),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data.message);
//       // Update the users state to reflect the deletion
//       setUsers((prevUsers) =>
//         prevUsers.filter((u) => u.username !== user.username)
//       );
//     } else {
//       const error = await response.json();
//       console.error("Error deleting user:", error.error);
//     }
//   };

//   const cancelDeleteUser = () => {
//     setShowConfirmation(false);
//     setSelectedUser(null);
//   };
// }
