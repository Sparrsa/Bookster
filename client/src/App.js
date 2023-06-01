import { BrowserRouter as Router } from "react-router-dom";
import renderRoutes from "./router/router";
import booksterLogo from "./assets/bookster.png";

export function App() {
  return (
    <>
      <header className="header-container">
        <img className="bookster-logo" alt="booksterlogo" src={booksterLogo} />
      </header>
      <Router>{renderRoutes()}</Router>
    </>
  );
}

export default App;
