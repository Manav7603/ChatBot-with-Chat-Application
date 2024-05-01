import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Login from "../components/Login";

// Mocking Firebase Auth method
jest.mock("firebase/auth", () => ({
	signInWithEmailAndPassword: jest.fn(),
}));

// Render with routing context
const renderWithRouter = (component) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Login Component", () => {
	test("renders correctly", () => {
		renderWithRouter(<Login />);

		// Check if components are rendered
		expect(screen.getByText(/Lama Chat/i)).toBeInTheDocument();
		expect(screen.getByText(/Login/i)).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/email/i)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/password/i)
		).toBeInTheDocument();
		expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
		expect(screen.getByText(/Register/i)).toBeInTheDocument();
	});

	test("calls signInWithEmailAndPassword on form submission", async () => {
		renderWithRouter(<Login />);

		const emailInput = screen.getByPlaceholderText(/email/i);
		const passwordInput = screen.getByPlaceholderText(/password/i);
		const submitButton = screen.getByText(/Sign in/i);

		// Fill inputs
		fireEvent.change(emailInput, {
			target: { value: "test@example.com" },
		});
		fireEvent.change(passwordInput, {
			target: { value: "password123" },
		});

		// Submit the form
		fireEvent.click(submitButton);

		// Check if signInWithEmailAndPassword is called with correct parameters
		await waitFor(() => {
			expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
				auth,
				"test@example.com",
				"password123"
			);
		});
	});

	test("displays error message when login fails", async () => {
		renderWithRouter(<Login />);

		const emailInput = screen.getByPlaceholderText(/email/i);
		const passwordInput = screen.getByPlaceholderText(/password/i);
		const submitButton = screen.getByText(/Sign in/i);

		// Mock signInWithEmailAndPassword to throw an error
		signInWithEmailAndPassword.mockImplementation(() => {
			throw new Error("Login failed");
		});

		// Fill inputs and submit the form
		fireEvent.change(emailInput, {
			target: { value: "invalid@example.com" },
		});
		fireEvent.change(passwordInput, {
			target: { value: "wrongpassword" },
		});
		fireEvent.click(submitButton);

		// Wait for error message to be displayed
		await waitFor(() => {
			expect(
				screen.getByText(/Something went wrong/i)
			).toBeInTheDocument();
		});
	});
});
