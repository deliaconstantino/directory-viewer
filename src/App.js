import Page from "./pages/Page.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="container mx-auto m-10">
      <h1 className="font-bold text-3xl text-gray-700">Directory Viewer</h1>
      <Router>
        <Route path="/">
          <Page />
        </Route>
      </Router>
    </div>
  );
}

export default App;
