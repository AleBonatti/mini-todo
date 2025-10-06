import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import App from "./App";

test("adds and toggles a todo", async () => {
  const user = userEvent.setup();
  render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  const input = screen.getByLabelText(/new todo/i);
  await user.type(input, "Buy milk");
  await user.keyboard("{Enter}");
  expect(screen.getByText("Buy milk")).toBeInTheDocument();

  const checkbox = screen.getByRole("checkbox");
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
});
