import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/Home";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

jest.mock("../components/Sidebar");
jest.mock("../components/Chat");

test("Home component renders Sidebar and Chat", () => {
	const { getByText } = render(<Home />);

	// Check if Sidebar and Chat components are rendered
	expect(Sidebar).toHaveBeenCalledTimes(1);
	expect(Chat).toHaveBeenCalledTimes(1);
});
