import { screen, render, fireEvent } from "@testing-library/react";
import { LoginComponent } from "./LoginComponent";

test("Should login a user and store the JWT token", async () => {
  // Mock the server response to return a JWT token
  const mockAccessToken = "mocked-access-token";
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ accessToken: mockAccessToken }),
  });

  render(<LoginComponent />);

  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Login");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });

  fireEvent.click(submitButton);

  // Check if the JWT token is stored in localStorage
  expect(localStorage.getItem("accessToken")).toEqual(mockAccessToken);

  // Restore the original fetch function
  global.fetch.mockRestore();
});

test("Login failed with incorrect credentials", async () => {
  render(<LoginComponent />);

  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Login");

  fireEvent.change(usernameInput, { target: { value: "invaliduser" } });
  fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });

  fireEvent.click(submitButton);

  const failureMessage = await screen.findByText(
    "Login failed. Please try again"
  );
  expect(failureMessage).toBeInTheDocument();
});
