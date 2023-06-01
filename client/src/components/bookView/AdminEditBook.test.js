import React from "react";
import { render, screen } from "@testing-library/react";
import { EditBook } from "./AdminEditBook";

describe("EditBook", () => {
  const bookObject = {
    title: "Book 1",
    author: "Author 1",
    quantity: 5,
  };

  it("should render the 'Edit' button", () => {
    render(<EditBook bookObject={bookObject} />);
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});
