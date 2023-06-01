/**
 * Author: William Sparr
 * Date 25e May
 *
 * This file contains two tests for the Login component.
 * The first test checks the successful login scenario, including the storage of the JWT token, while the second test verifies the handling of failed login attempts with incorrect credentials.
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { Login } from "./LoginComponent";
import { MemoryRouter } from "react-router-dom";

test("Should login a user and store the JWT token", async () => {
  jest.spyOn(global, "fetch").mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ accessToken: "mocked-access-token" }),
    })
  );
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Sign in");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });

  fireEvent.click(submitButton);

  const successMessage = await screen.findByText("Successfully signed in");
  expect(successMessage).toBeInTheDocument();

  expect(localStorage.getItem("accessToken")).toEqual("mocked-access-token");

  global.fetch.mockRestore();
});

test("Login failed with incorrect credentials", async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const usernameInput = screen.getByLabelText("Username:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Sign in");

  fireEvent.change(usernameInput, { target: { value: "invaliduser" } });
  fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });

  fireEvent.click(submitButton);

  const failureMessage = await screen.findByText(
    "Login failed. Please try again"
  );
  expect(failureMessage).toBeInTheDocument();
});
