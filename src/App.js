import Teleport from "./pages/page/Teleport.js";
import Home from "./pages/home/Home.js";
import Page from "./pages/page/Page.js";
import DataFinder from "./components/DataFinder.js";
import { directory } from "./data/directory.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="bg-indigo-200 shadow-md">
        <Link className="underline" to="/">
          Directory Viewer
        </Link>
        <Link className="underline" to={`${directory.name}`}>
          Teleport
        </Link>
      </div>

      <Switch>
        <Route path="/:path">
          <DataFinder />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
