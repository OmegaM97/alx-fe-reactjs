import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("adds a new todo", async () => {
    render(<TodoList />);
    const input = screen.getByTestId("add-todo-input");
    const button = screen.getByTestId("add-todo-btn");

    await userEvent.type(input, "New Todo");
    fireEvent.click(button);

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles a todo completed state", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");
    expect(todoItem).toHaveStyle("text-decoration: none");

    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: line-through");

    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: none");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Write Tests");
    const deleteBtn = screen.getByTestId(/delete-btn-/i);

    fireEvent.click(deleteBtn);
    expect(todoItem).not.toBeInTheDocument();
  });
});
