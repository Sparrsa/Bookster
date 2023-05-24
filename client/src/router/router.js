import { LoginComponent } from "../components/authorization/LoginComponent";
import { RegisterComponent } from "../components/authorization/RegisterComponent";

const routes = [
  {
    path: "*",
    element: <h2>Path not found</h2>,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/register",
    element: <RegisterComponent />,
  },
];

export default routes;
