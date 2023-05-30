import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../components/authorization/LoginComponent";
import { Register } from "../components/authorization/RegisterComponent";
import { BookList } from "../components/bookView/BookList";
import { GuestBookList } from "../components/bookView/GuestBookList";
import { AdminView } from "../components/bookView/AdminView";

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
    private: true, // Specify that this route requires authentication
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

// Check if the user is authenticated
const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken; // Returns true if accessToken exists
};

// Render the routes, applying the redirect logic for private routes
const renderRoutes = () => {
  //---------------kanske måste skriva test till den här?--------------Lägga in i en abstract mapp??
  return (
    <Routes>
      {routes.map((route, index) => {
        const { path, element, private: isPrivate, authRedirect } = route;
        const isAuthRequired = isPrivate && !isAuthenticated();

        if (authRedirect && isAuthenticated()) {
          // Redirect to BookList if already logged in
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
