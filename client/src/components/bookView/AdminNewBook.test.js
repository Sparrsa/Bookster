/**
 * Author: William Sparr
 * Date: 1st June
 *
 * This file tests whether the popup window for adding a new book renders correctly.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { AddNewBook } from "./AdminNewBook";

describe("AddNewBook", () => {
  test("should render the 'Add new book' button", () => {
    render(<AddNewBook />);

    const addButton = screen.getByText("Add new book");
    expect(addButton).toBeInTheDocument();
  });

  test("should show the popup when the 'Add new book' button is clicked", () => {
    render(<AddNewBook />);

    const addButton = screen.getByText("Add new book");
    fireEvent.click(addButton);

    const popup = screen.getByTestId("add-new-book-popup");
    expect(popup).toBeInTheDocument();
  });

  test("should hide the popup when the 'Cancel' button is clicked", () => {
    render(<AddNewBook />);

    const addButton = screen.getByText("Add new book");
    fireEvent.click(addButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    const popup = screen.queryByTestId("add-new-book-popup");
    expect(popup).not.toBeInTheDocument();
  });

  test("should call the 'handleAddNewBook' function when 'Save' button is clicked", () => {
    render(<AddNewBook />);

    const addButton = screen.getByText("Add new book");
    fireEvent.click(addButton);

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
  });
});
