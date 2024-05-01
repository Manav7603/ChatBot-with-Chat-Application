import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Register from "../pages/Register";
import { auth } from "../firebase";

// Mock createUserWithEmailAndPassword function
jest.mock("firebase/auth", () => ({
	createUserWithEmailAndPassword: jest.fn(),
}));

describe("Register component", () => {
	test("Form submits successfully", async () => {
		// Mock successful user creation
		createUserWithEmailAndPassword.mockResolvedValue();

		const { getByPlaceholderText, getByText } = render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		);

		// Fill out form
		const emailInput = getByPlaceholderText("email");
		const passwordInput = getByPlaceholderText("password");
		const submitButton = getByText("Register");

		fireEvent.change(emailInput, {
			target: { value: "test@example.com" },
		});
		fireEvent.change(passwordInput, {
			target: { value: "password" },
		});
		fireEvent.click(submitButton);

		// Ensure createUserWithEmailAndPassword is called with correct arguments
		await waitFor(() => {
			expect(
				createUserWithEmailAndPassword
			).toHaveBeenCalledWith(
				auth,
				"test@example.com",
				"password"
			);
		});

		// Ensure navigation occurs after successful registration
		expect(window.location.pathname).toBe("/login");
	});

	test("Form shows error on failed registration", async () => {
		// Mock failed user creation
		createUserWithEmailAndPassword.mockRejectedValue(
			new Error("Registration failed")
		);

		const { getByPlaceholderText, getByText } = render(
			<MemoryRouter>
				<Register />
			</MemoryRouter>
		);

		// Fill out form
		const emailInput = getByPlaceholderText("email");
		const passwordInput = getByPlaceholderText("password");
		const submitButton = getByText("Register");

		fireEvent.change(emailInput, {
			target: { value: "test@example.com" },
		});
		fireEvent.change(passwordInput, {
			target: { value: "password" },
		});
		fireEvent.click(submitButton);

		// Ensure error message is displayed
		const errorMessage = await waitFor(() =>
			getByText("Something went wrong")
		);
		expect(errorMessage).toBeInTheDocument();
	});
});
