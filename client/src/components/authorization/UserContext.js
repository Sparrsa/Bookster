// import { createContext, useState, useEffect } from "react";

// export const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const userData = getUserDataFromAccessToken(accessToken);
//     setUser(userData);
//   }, []);

//   function getUserDataFromAccessToken(accessToken) {
//     // Implement your logic here to decode the access token and extract user data
//     // For simplicity, let's assume the access token contains a username field
//     const decodedToken = decodeToken(accessToken);
//     const username = decodedToken.username;

//     // Return the user object with the extracted data
//     return {
//       username: username,
//     };
//   }

//   function decodeToken(accessToken) {
//     // Implement your logic here to decode the access token
//     // For simplicity, let's assume it's a simple base64 decoding
//     const decodedToken = atob(accessToken);

//     // Return the decoded token object
//     return JSON.parse(decodedToken);
//   }

//   return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
// }
