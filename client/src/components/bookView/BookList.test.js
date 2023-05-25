import { render, act } from "@testing-library/react";
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
