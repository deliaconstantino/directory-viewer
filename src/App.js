import Teleport from "./pages/teleport/Teleport.js";
import Home from "./pages/home/Home.js";
import Directory from "./pages/teleport/Directory.js";
import { directory } from "./data/directory.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function App() {
  console.log(directory);
  return (
    <Router>
      <div className="bg-indigo-200 shadow-md">
        <Link className="underline" to="/">
          Directory Viewer
        </Link>
      </div>

      <Switch>
        <Route path="/:path">
          <Directory />
        </Route>
        <Route path="/teleport">
          <Teleport />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
