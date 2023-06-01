/**
 * Author: William Sparr
 * Date 31st May
 *
 *  This file contains two tests for the BookList component.
 *  The first test verifies the filtering of books based on a search query, while the second test checks the sign-out functionality.
 *
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookList } from "./BookList";

test("Filter books by search query", async () => {
  const mockBooks = [
    { id: 1, title: "Book 1", author: "Author 1", quantity: 5 },
    { id: 2, title: "Book 2", author: "Author 2", quantity: 3 },
    { id: 3, title: "Book 3", author: "Author 3", quantity: 8 },
  ];

  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ books: mockBooks }),
  });

  render(<BookList />);

  await waitForBooksToBeDisplayed();

  expect(screen.getByText("Book 1")).toBeInTheDocument();
  expect(screen.getByText("Book 2")).toBeInTheDocument();
  expect(screen.getByText("Book 3")).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Search for books"), {
    target: { value: "Book 2" },
  });

  await waitForFilteredBooksToBeDisplayed("Book 2");

  expect(screen.queryByText("Book 1")).not.toBeInTheDocument();
  expect(screen.getByText("Book 2")).toBeInTheDocument();
  expect(screen.queryByText("Book 3")).not.toBeInTheDocument();

  global.fetch.mockRestore();
});

test("Sign out", () => {
  const removeItemMock = jest.fn();

  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: removeItemMock,
    },
    writable: true,
  });

  render(<BookList />);

  fireEvent.click(screen.getByText("Sign Out"));

  expect(removeItemMock).toHaveBeenCalledWith("accessToken");
});

const waitForBooksToBeDisplayed = async () => {
  await waitFor(() => {
    screen.getByText("Book 1");
    screen.getByText("Book 2");
    screen.getByText("Book 3");
  });
};

const waitForFilteredBooksToBeDisplayed = async (filteredBookTitle) => {
  await waitFor(() => {
    screen.getByText(filteredBookTitle);
  });
};
