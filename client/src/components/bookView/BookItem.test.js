/**
 * Author: William Sparr
 * Date 31st May
 *
 * This file contains two tests for the BookItem component.
 * The first test verifies the ordering functionality by simulating button clicks and checking the arguments passed to the handleOrderBook function.
 * The second test ensures that the handleOrderBook function is not called when the ordered quantity is 0.
 *
 */

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

  fireEvent.click(screen.getByText("+"));

  fireEvent.click(screen.getByText("Order"));

  fireEvent.click(screen.getByText("-"));

  expect(handleOrderBook).toHaveBeenCalledWith({
    ...book,
    quantity: 1,
  });

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

  expect(handleOrderBook).not.toHaveBeenCalled();

  fireEvent.click(screen.getByText("Order"));

  expect(handleOrderBook).not.toHaveBeenCalled();
});
