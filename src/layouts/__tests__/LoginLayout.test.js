import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import '../../../matchMedia';
import LoginLayout from "../LoginLayout";

describe("LoginLayout", () => {
	test("renders the LoginLayout component", () => {
		const { getByText } = render(
			<LoginLayout>
				<div>Login Content</div>
			</LoginLayout>
		);

		// Check if the content passed to LoginLayout is rendered
		expect(getByText("Login Content")).toBeInTheDocument();
	});

	test("applies the correct class names", () => {
		const { container } = render(
			<LoginLayout>
				<div>Login Content</div>
			</LoginLayout>
		);

		// Check if the outermost container has the correct class name
		expect(container.firstChild).toHaveClass("login-layout");

		// Check if the content container has the correct class name (assuming it's applied within LoginLayout)
		expect(container.querySelector(".login-content")).toBeInTheDocument();
	});
});
