import { BrowserRouter as Router } from "react-router-dom";
import renderRoutes from "./router/router";

export function App() {
  return (
    <>
      <header className="header-container">
        <h1 className="header">Bookster</h1>
      </header>
      <Router>{renderRoutes()}</Router>
    </>
  );
}

export default App;
