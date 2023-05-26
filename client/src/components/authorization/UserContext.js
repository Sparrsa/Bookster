import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Retrieve user data from local storage or any other source
  const accessToken = localStorage.getItem("accessToken");
  const userData = getUserDataFromAccessToken(accessToken);

  // Set the user data in the context
  setUser(userData);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// Utility function to extract user data from the access token
function getUserDataFromAccessToken(accessToken) {
  // Implement your logic here to decode the access token and extract user data
  // For simplicity, let's assume the access token contains a username field
  const decodedToken = decodeToken(accessToken);
  const username = decodedToken.username;

  // Return the user object with the extracted data
  return {
    username: username,
  };
}

// Utility function to decode the access token (you may need to use a library for this)
function decodeToken(accessToken) {
  // Implement your logic here to decode the access token
  // For simplicity, let's assume it's a simple base64 decoding
  const decodedToken = atob(accessToken);

  // Return the decoded token object
  return JSON.parse(decodedToken);
}
