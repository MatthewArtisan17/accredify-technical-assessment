// src/components/__tests__/CareerGoal.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import CareerGoal from "../CareerGoal";
import { useSelector } from "react-redux";

// Mock useSelector
jest.mock("react-redux", () => ({
	useSelector: jest.fn(),
}));

const mockStore = configureStore([]);

describe("CareerGoal", () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			careerGoal: {
				data: { name: "Engineer", progress: 70 },
				loading: false,
			},
		});

		useSelector.mockImplementation((selector) => selector(store.getState()));
	});

	test("renders loading spinner when loading", () => {
		store = mockStore({
			careerGoal: {
				data: null,
				loading: true,
			},
		});

		useSelector.mockImplementation((selector) => selector(store.getState()));

		render(
			<Provider store={store}>
				<Router>
					<CareerGoal />
				</Router>
			</Provider>
		);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	test("renders career goal data correctly", () => {
		render(
			<Provider store={store}>
				<Router>
					<CareerGoal />
				</Router>
			</Provider>
		);

		expect(screen.getByText("Career Goal")).toBeInTheDocument();
		expect(screen.getByText("Your Progress")).toBeInTheDocument();
		expect(screen.getByText("I want to become an:")).toBeInTheDocument();
		expect(screen.getByText("Engineer")).toBeInTheDocument();
	});

	test('conditionally renders "View Insights" link', () => {
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/"]}>
					<CareerGoal />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText("View Insights")).toBeInTheDocument();

		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/career-goal"]}>
					<CareerGoal />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.queryByText("View Insights")).not.toBeInTheDocument();
	});
});
