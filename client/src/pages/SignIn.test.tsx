import axios from "axios";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router } from "react-router-dom";

import { AUTH_LOGIN } from "@/store/statics";
import axiosInstance from "@/utils/axiosInstance";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import SignIn from "./SignIn";

import "@testing-library/jest-dom";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("@/utils/axiosInstance", () => ({
  post: jest.fn(),
}));

describe("SignIn Component", () => {
  const mockHandleSubmit = jest.fn();
  const mockRegister = jest.fn();
  const mockErrors: {
    email?: { message: string };
    password?: { message: string };
  } = {};

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
      register: mockRegister,
      formState: { errors: mockErrors },
    });
  });

  test("renders SignIn component", () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    expect(
      screen.getByRole("heading", { name: /sign in to your account/i })
    ).toBeInTheDocument();
  });

  test("renders email and password fields", () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    expect(screen.getByTitle(/email/i)).toBeInTheDocument();
    expect(screen.getByTitle(/password/i)).toBeInTheDocument();
  });

  test("handles form submission", () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    fireEvent.submit(screen.getByRole("button", { name: /Sign in/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  test("displays error messages", () => {
    mockErrors.email = { message: "Email is required" };
    mockErrors.password = { message: "Password is required" };
    render(
      <Router>
        <SignIn />
      </Router>
    );
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  test("displays password length error", async () => {
    mockErrors.password = {
      message: "Password must be at least 6 characters long",
    };
    render(
      <Router>
        <SignIn />
      </Router>
    );
    fireEvent.change(screen.getByTitle(/Password/i), {
      target: { value: "123" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 6 characters long/i)
      ).toBeInTheDocument();
    });
  });

  test("displays validation errors on empty fields", async () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    fireEvent.submit(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 6 characters long/i)
      ).toBeInTheDocument();
    });
  });

  test("displays invalid email error", async () => {
    mockErrors.email = { message: "Invalid email address" };
    render(
      <Router>
        <SignIn />
      </Router>
    );
    fireEvent.change(screen.getByTitle(/Email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  test("displays remember me checkbox", () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    expect(screen.getByText(/Remember me/i)).toBeInTheDocument();
  });

  test("displays forgot password link", () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
  });

});
