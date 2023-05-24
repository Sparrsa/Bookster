import { fireEvent, render, screen } from "@testing-library/react";
import { RegisterComponent } from "./RegisterComponent";

test("Should register a new user", async () => {
  render(<RegisterComponent />);

  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Register new account");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });

  fireEvent.click(submitButton);

  const successMessage = await screen.findByText(
    "Account successfully created"
  );
  expect(successMessage).toBeInTheDocument();
});

test("Username and password can't be under 4 characters", () => {
  render(<RegisterComponent />);

  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Register new account");

  fireEvent.change(usernameInput, { target: { value: "abc" } });
  fireEvent.change(passwordInput, { target: { value: "123" } });

  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(
    "Username and password must be at least 4 characters long"
  );
  expect(errorMessage).toBeInTheDocument();
});
