import { render, screen, fireEvent } from "@testing-library/react";
import { BookItem } from "./BookItem";

test("Should order books", async () => {
  const book = {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    quantity: 5,
  };
  const handleOrderBook = jest.fn();

  render(<BookItem book={book} handleOrderBook={handleOrderBook} />);

  // Click on the "+" button to increase the ordered quantity
  fireEvent.click(screen.getByText("+"));

  // Click on the "Order" button
  fireEvent.click(screen.getByText("Order"));

  fireEvent.click(screen.getByText("-"));

  // Verify that the handleOrderBook function is called with the correct arguments
  expect(handleOrderBook).toHaveBeenCalledWith({
    ...book,
    quantity: 1, // Assuming the initial ordered quantity was 0
  });

  // Verify that the ordered quantity is reset to 0
  expect(screen.getByText("0")).toBeInTheDocument();
});

test("Should not call handleOrderBook when ordered quantity is zero", async () => {
  const book = {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    quantity: 5,
  };
  const handleOrderBook = jest.fn();

  render(<BookItem book={book} handleOrderBook={handleOrderBook} />);

  // Verify that the handleOrderBook function is not called
  expect(handleOrderBook).not.toHaveBeenCalled();

  // Click on the "Order" button without increasing the ordered quantity
  fireEvent.click(screen.getByText("Order"));

  // Verify that the handleOrderBook function is still not called
  expect(handleOrderBook).not.toHaveBeenCalled();
});

test("Should display book information", async () => {
  const book = {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    quantity: 5,
  };
  const handleOrderBook = jest.fn();

  render(<BookItem book={book} handleOrderBook={handleOrderBook} />);

  // Verify that the book title is displayed
  expect(screen.getByText("Book 1")).toBeInTheDocument();

  // Verify that the book author is displayed
  expect(screen.getByText("Author 1")).toBeInTheDocument();

  // Verify that the book availability is displayed
  expect(screen.getByText("5 Left")).toBeInTheDocument();
});
