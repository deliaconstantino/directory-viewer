import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import DataFinder from "./DataFinder";

describe("DataFinder Component", () => {
  it("finds data when the url pattern matches data in the directory", () => {
    const history = createMemoryHistory();
    history.push("/directory/teleport/lib");
    render(
      <Router history={history}>
        <DataFinder />
      </Router>
    );

    expect(screen.getByText("newTeleport")).toBeTruthy();
  });

  it("renders the noMatchFound component when the url pattern does not match data in the directory", () => {
    const history = createMemoryHistory();
    history.push("/directory/teleport/teleport/lib/hello");
    render(
      <Router history={history}>
        <DataFinder />
      </Router>
    );

    expect(screen.getByText("No matching directories found.")).toBeTruthy();
  });
});
