import { BrowserRouter as Router } from "react-router-dom";
import renderRoutes from "./router/router";

export function App() {
  return <Router>{renderRoutes()}</Router>;
}

export default App;
