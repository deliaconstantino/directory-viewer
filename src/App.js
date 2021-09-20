import DataFinder from "./components/DataFinder.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="container mx-auto m-10">
      <h1 className="font-bold text-3xl text-gray-700">Directory Viewer</h1>
      <Router>
        <Switch>
          <Route path="/directory">
            <DataFinder />
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
