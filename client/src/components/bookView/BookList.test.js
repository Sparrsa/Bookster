import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookList } from "./BookList";

test("Show all books on page", async () => {
  const mockBooks = [
    { id: 1, title: "Book 1", author: "Author 1", quantity: 5 },
    { id: 2, title: "Book 2", author: "Author 2", quantity: 3 },
    { id: 3, title: "Book 3", author: "Author 3", quantity: 8 },
  ];

  // Mock the fetchBooks function to return the mockBooks data
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ books: mockBooks }),
  });

  render(<BookList />);

  await waitForBooksToBeDisplayed();

  // Check if the books are displayed on the page
  expect(screen.getByText("Book 1")).toBeInTheDocument();
  expect(
    screen.getByText((content, element) => {
      return element.textContent.includes("Author 1");
    })
  ).toBeInTheDocument();
  expect(screen.getByText("5 left")).toBeInTheDocument();

  expect(screen.getByText("Book 2")).toBeInTheDocument();
  expect(
    screen.getByText((content, element) => {
      return element.textContent.includes("Author 2");
    })
  ).toBeInTheDocument();
  expect(screen.getByText("3 left")).toBeInTheDocument();

  expect(screen.getByText("Book 3")).toBeInTheDocument();
  expect(
    screen.getByText((content, element) => {
      return (
        element.textContent.includes("Author:") &&
        element.textContent.includes("Author 3")
      );
    })
  ).toBeInTheDocument();

  // Restore the original implementation of fetch
  global.fetch.mockRestore();
});

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
      removeItem: removeItemMock,
    },
    writable: true,
  });

  render(<BookList />);

  fireEvent.click(screen.getByText("Sign Out"));

  expect(removeItemMock).toHaveBeenCalledWith("accessToken");
});

// Helper function to wait for books to be displayed
const waitForBooksToBeDisplayed = async () => {
  await waitFor(() => {
    screen.getByText("Book 1");
    screen.getByText("Book 2");
    screen.getByText("Book 3");
  });
};

// Helper function to wait for filtered books to be displayed
const waitForFilteredBooksToBeDisplayed = async (filteredBookTitle) => {
  await waitFor(() => {
    screen.getByText(filteredBookTitle);
  });
};
