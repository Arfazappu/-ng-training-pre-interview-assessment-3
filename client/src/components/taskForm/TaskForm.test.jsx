import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm"; // Adjust the import path as necessary
import Button from "../uiComponents/button/Button"; // Adjust the import path as necessary

describe("TaskForm Component", () => {
  const mockCloseModal = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    mockCloseModal.mockClear();
    mockOnSave.mockClear();
  });

  test("renders TaskForm in create mode", () => {
    render(<TaskForm isOpen={true} closeModal={mockCloseModal} onSave={mockOnSave} />);
    
    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByLabelText(/assigned to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  test("renders TaskForm in edit mode", () => {
    const task = {
      assignedTo: "User 1",
      status: "In Progress",
      dueDate: "2024-09-30",
      priority: "Normal",
      comment: "Test comment",
    };

    render(<TaskForm isOpen={true} closeModal={mockCloseModal} onSave={mockOnSave} task={task} />);
    
    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("User 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("In Progress")).toBeInTheDocument();
  });

  test("validates required fields", () => {
    render(<TaskForm isOpen={true} closeModal={mockCloseModal} onSave={mockOnSave} />);
    
    fireEvent.click(screen.getByText("Save")); // Submit without filling form

    expect(screen.getByText("Assigned To is required")).toBeInTheDocument();
    expect(screen.getByText("Status is required")).toBeInTheDocument();
    expect(screen.getByText("Priority is required")).toBeInTheDocument();
  });

  test("calls onSave with task data on valid submission", () => {
    render(<TaskForm isOpen={true} closeModal={mockCloseModal} onSave={mockOnSave} />);
    
    fireEvent.change(screen.getByLabelText(/assigned to/i), { target: { value: "User 1" } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: "In Progress" } });
    fireEvent.change(screen.getByLabelText(/priority/i), { target: { value: "Normal" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-09-30" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Task description" } });
    
    fireEvent.click(screen.getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith({
      assignedTo: "User 1",
      status: "In Progress",
      dueDate: "2024-09-30",
      priority: "Normal",
      comment: "Task description",
    });
    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("calls closeModal on cancel", () => {
    render(<TaskForm isOpen={true} closeModal={mockCloseModal} onSave={mockOnSave} />);
    
    fireEvent.click(screen.getByText("Cancel"));

    expect(mockCloseModal).toHaveBeenCalled();
  });
});