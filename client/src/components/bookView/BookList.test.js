import { render, screen, fireEvent, act } from "@testing-library/react";
import { BookList } from "./BookList";

test("Show all books on page", async () => {
  const mockBooks = [
    { id: 1, title: "Book 1", author: "Author 1", quantity: 5 },
    { id: 2, title: "Book 2", author: "Author 2", quantity: 3 },
    { id: 3, title: "Book 3", author: "Author 3", quantity: 8 },
  ];

  // Mock the fetchBooks function to return the mockBooks data
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ books: mockBooks }),
    })
  );

  // Render the BookList component
  let container;
  await act(async () => {
    container = render(<BookList />).container;
  });

  // Check if the books are displayed on the page
  expect(container).toHaveTextContent("Book 1");
  expect(container).toHaveTextContent("Author: Author 1");
  expect(container).toHaveTextContent("Availability: 5");

  expect(container).toHaveTextContent("Book 2");
  expect(container).toHaveTextContent("Author: Author 2");
  expect(container).toHaveTextContent("Availability: 3");

  expect(container).toHaveTextContent("Book 3");
  expect(container).toHaveTextContent("Author: Author 3");
  expect(container).toHaveTextContent("Availability: 8");

  // Restore the original implementation of fetch
  global.fetch.mockRestore();
});

test("Filter books by search query", async () => {
  const mockBooks = [
    { id: 1, title: "Book 1", author: "Author 1", quantity: 5 },
    { id: 2, title: "Book 2", author: "Author 2", quantity: 3 },
    { id: 3, title: "Book 3", author: "Author 3", quantity: 8 },
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ books: mockBooks }),
    })
  );

  render(<BookList />);

  // Check if all books are displayed initially
  expect(screen.getByText("Book 1")).toBeInTheDocument();
  expect(screen.getByText("Book 2")).toBeInTheDocument();
  expect(screen.getByText("Book 3")).toBeInTheDocument();

  // Search for "Book 2"
  fireEvent.change(screen.getByPlaceholderText("Search for books"), {
    target: { value: "Book 2" },
  });

  // Check if only "Book 2" is displayed
  expect(screen.getByText("Book 2")).toBeInTheDocument();
  expect(screen.queryByText("Book 1")).toBeNull();
  expect(screen.queryByText("Book 3")).toBeNull();

  // Restore the original implementation of fetch
  global.fetch.mockRestore();
});

test("Sign out", () => {
  const removeItemMock = jest.fn(); // Create a mock function instead of a spy

  // Mock the localStorage.removeItem function
  Object.defineProperty(window, "localStorage", {
    value: {
      removeItem: removeItemMock,
    },
    writable: true,
  });

  render(<BookList />);

  // Click the "Sign Out" button
  fireEvent.click(screen.getByText("Sign Out"));

  // Check if the "localStorage.removeItem" was called with the correct parameter
  expect(removeItemMock).toHaveBeenCalledWith("accessToken");
});
