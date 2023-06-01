/**
 * Author William Sparr
 * Date 1st June
 *
 * This file sets up the routing configuration for the application using React Router. It defines a list of routes and provides functions to check authentication and user roles.
 * Overall, this file sets up the routing configuration for the application, checks authentication and user roles, and renders the appropriate components based on the defined routes.
 */

import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../components/authorization/LoginComponent";
import { Register } from "../components/authorization/RegisterComponent";
import { BookList } from "../components/bookView/BookList";
import { GuestBookList } from "../components/bookView/GuestBookList";
import { AdminView } from "../components/bookView/AdminView";
import jwt_decode from "jwt-decode";

const routes = [
  {
    path: "*",
    element: <h2>Path not found</h2>,
  },
  {
    path: "/login",
    element: <Login />,
    authRedirect: true,
  },
  {
    path: "/register",
    element: <Register />,
    authRedirect: true,
  },
  {
    path: "/books",
    element: <BookList />,
    private: true,
  },
  {
    path: "/booksGuest",
    element: <GuestBookList />,
    private: false,
  },
  {
    path: "adminView",
    element: <AdminView />,
    private: true,
  },
];

const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
};

const hasRole = (requiredRole) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const decodedToken = jwt_decode(accessToken);
    const userRole = decodedToken.role;
    return userRole === requiredRole;
  }
  return false;
};

const renderRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const { path, element, private: isPrivate, authRedirect } = route;
        const isAuthRequired = isPrivate && !isAuthenticated();

        if (authRedirect && isAuthenticated()) {
          return (
            <Route
              key={index}
              path={path}
              element={<Navigate to="/books" replace />}
            />
          );
        }

        return (
          <Route
            key={index}
            path={path}
            element={isAuthRequired ? <Navigate to="/login" /> : element}
          />
        );
      })}
    </Routes>
  );
};

export default renderRoutes;
