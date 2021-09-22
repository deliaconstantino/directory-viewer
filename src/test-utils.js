import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui, route = "/") => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: BrowserRouter})
}

export * from "@testing-library/react";

export { renderWithRouter }
