import Teleport from "./pages/teleport/Teleport.js";
import Home from "./pages/home/Home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <div className="bg-indigo-200 shadow-md">
          <Link to="/">Directory Viewer</Link>
        </div>

        <Switch>
          <Route path="/teleport">
            <Teleport />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
