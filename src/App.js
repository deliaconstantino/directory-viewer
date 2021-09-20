import DataFinder from "./components/DataFinder.js";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>
        Directory Viewer
      </h1>
      <Router>
      <Switch>
        <Route path="/directory">
          <DataFinder/>
        </Route>
        <Route path="/">
          <Redirect to="/directory" />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
