import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from '../contexts/Auth';
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Login page", () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();
  const mockContext = {
    login: mockLogin,
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <AuthContext.Provider value={mockContext}>
        <Login />
      </AuthContext.Provider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login form", () => {
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  it("calls the login function with the correct arguments when the form is submitted", () => {
    const usernameInput = screen.getByPlaceholderText("Login");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Entrar");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith("testuser", "testpassword");
  });

  it("navigates to the home page when the login is successful", async () => {
    mockLogin.mockResolvedValueOnce(null);

    const usernameInput = screen.getByPlaceholderText("Login");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Entrar");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalled());

     expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("displays an error message when the login fails", async () => {
    mockLogin.mockResolvedValueOnce("Nome de usuário ou senha incorretos");

    const usernameInput = screen.getByPlaceholderText("Login");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Entrar");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalled());

    expect(
      screen.getByText("Nome de usuário ou senha incorretos")
    ).toBeInTheDocument();
  });

  it("displays an error message when the username or password is invalid", async () => {
    const usernameInput = screen.getByPlaceholderText("Login");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Entrar");

    fireEvent.change(usernameInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(
      screen.getByText("Verifique suas informações novamente.")
    ).toBeInTheDocument();
  });
});