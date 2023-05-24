import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router/router";

function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
