import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";
import api from "../services/api";
import "@testing-library/jest-dom";

jest.mock("../services/api");

test("renders login form", () => {
  render(<Login />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test("handles login submit", async () => {
  (api.post as jest.Mock).mockResolvedValue({ data: { token: "fake-token" } });
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByText(/Login/i));
  expect(await screen.findByText("Login successful")).toBeInTheDocument();
});
