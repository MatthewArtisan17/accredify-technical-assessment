// src/components/__tests__/RecentDocuments.test.js

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import RecentDocuments from "../RecentDocuments";
import documentsReducer from "../../store/documentsSlice";
import { Spin } from "antd";
import '@testing-library/jest-dom/extend-expect';

// Mock the necessary modules
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: () => ({
    pathname: "/"
  }),
}));

const mockNavigate = jest.fn();

describe("RecentDocuments", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        documents: documentsReducer,
      },
    });
  });

  test("renders the component with documents", async () => {
    store = configureStore({
      reducer: {
        documents: documentsReducer,
      },
      preloadedState: {
        documents: {
          data: [
            {
              key: "1",
              document_name: "Document 1",
              received_on: "2024-08-01T00:00:00Z",
            },
          ],
          loading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <RecentDocuments />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Recent Documents")).toBeInTheDocument();
    expect(screen.getByText("Document 1")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  test("displays loading spinner when loading", () => {
    store = configureStore({
      reducer: {
        documents: documentsReducer,
      },
      preloadedState: {
        documents: {
          data: [],
          loading: true,
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <RecentDocuments />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("navigates to '/documents' when 'View All Documents' is clicked", () => {
    store = configureStore({
      reducer: {
        documents: documentsReducer,
      },
      preloadedState: {
        documents: {
          data: [],
          loading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <RecentDocuments />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText("View All Documents"));
    expect(mockNavigate).toHaveBeenCalledWith("/documents");
  });

  test("displays dropdown menu in table actions column", async () => {
    store = configureStore({
      reducer: {
        documents: documentsReducer,
      },
      preloadedState: {
        documents: {
          data: [
            {
              key: "1",
              document_name: "Document 1",
              received_on: "2024-08-01T00:00:00Z",
            },
          ],
          loading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <RecentDocuments />
        </Router>
      </Provider>
    );

    // Open the dropdown menu
    fireEvent.click(screen.getByRole('button', { name: /more/i }));

    await waitFor(() => {
      expect(screen.getByText("View")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });
  });
});