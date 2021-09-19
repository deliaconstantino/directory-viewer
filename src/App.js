import DataFinder from "./components/DataFinder.js";
import { directory } from "./data/directory.js";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/directory/:id">
          <DataFinder/>
        </Route>
        <Route path="/directory">
          <DataFinder/>
        </Route>
        <Route path="/">
          <Redirect to="/directory" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
