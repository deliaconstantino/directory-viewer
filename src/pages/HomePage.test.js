import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import HomePage from "./HomePage";

const existingPath = "/teleport/lib";
const nonexistentPath = "/directory/teleport/teleport";

describe("HomePage Component", () => {
  it("renders a table when errorMessage is false", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={[existingPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const table = getByRole("table");
    expect(table).toBeTruthy();
  });

  it("does not render a table when errorMessage is true", () => {
    const { queryByRole } = render(
      <MemoryRouter initialEntries={[nonexistentPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const table = queryByRole("table");
    expect(table).toBeNull();
  });

  it("does not render the NoMatchFound alert when errorMessage is false", () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={[existingPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const noMatch = queryByText("No matching directories found.");
    expect(noMatch).toBeNull();
  });

  it("renders the NoMatchFound alert when errorMessage is true", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[nonexistentPath]}>
        <HomePage />
      </MemoryRouter>
    );
    const noMatch = getByText("No matching directories found.");
    expect(noMatch).toBeTruthy();
  });

  it("finds data when the url pattern matches data in the directory", () => {
    const history = createMemoryHistory();
    history.push("/teleport/lib");
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    expect(screen.getByText("newTeleport")).toBeTruthy();
  });

  it("renders the noMatchFound component when the url pattern does not match data in the directory", () => {
    const history = createMemoryHistory();
    history.push("/teleport/teleport/lib/hello");
    render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    expect(screen.getByText("No matching directories found.")).toBeTruthy();
  });
});
