import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import App from "./App";

it("naviga a About e torna su Home", async () => {
  const user = userEvent.setup();
  render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // parte da Home
  expect(screen.getByRole("heading", { name: /mini to-do/i })).toBeInTheDocument();

  // vai su About
  await user.click(screen.getByRole("link", { name: /about/i }));
  expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();

  // torna su Home
  await user.click(screen.getByRole("link", { name: /home/i }));
  expect(screen.getByRole("heading", { name: /mini to-do/i })).toBeInTheDocument();
});
