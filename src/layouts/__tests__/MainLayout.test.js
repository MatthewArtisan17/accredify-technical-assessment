// src/layouts/__tests__/MainLayout.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MainLayout from '../MainLayout';
import { logout, togglePersonal } from '../../store/userSlice';
import '@testing-library/jest-dom/extend-expect';

// Create a mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('MainLayout', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        data: {
          name: 'John Doe'
        }
      }
    });
  });

  test('renders Sidebar, ProfileCircle, and Outlet', () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="*" element={<div>Test Content</div>} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    );

    // Check if Sidebar is rendered (you may need to adjust based on Sidebar content)
    expect(screen.getByText(/Sidebar/)).toBeInTheDocument();

    // Check if ProfileCircle is rendered in the dropdown
    expect(screen.getByRole('button')).toBeInTheDocument();

    // Check if Outlet renders content
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('displays user profile and provides logout option', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="*" element={<div>Test Content</div>} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    );

    // Open dropdown menu
    fireEvent.click(screen.getByText(/John Doe/));

    // Check if profile info is displayed
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Recipient/)).toBeInTheDocument();

    // Check if logout option is present
    expect(screen.getByText(/Log Out/)).toBeInTheDocument();
  });

  test('logout functionality', async () => {
    // Mock dispatch function
    jest.spyOn(store, 'dispatch').mockImplementation(() => Promise.resolve());

    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="*" element={<div>Test Content</div>} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    );

    // Open dropdown menu
    fireEvent.click(screen.getByText(/John Doe/));

    // Trigger logout
    fireEvent.click(screen.getByText(/Log Out/));

    // Verify if logout action is dispatched
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(logout());
    });
  });

  test('toggle personal functionality', async () => {
    // Mock dispatch function
    jest.spyOn(store, 'dispatch').mockImplementation(() => Promise.resolve());

    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="*" element={<div>Test Content</div>} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    );

    // Trigger toggle personal
    fireEvent.click(screen.getByText(/Toggle Personal/));

    // Verify if togglePersonal action is dispatched
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(togglePersonal());
    });
  });

  test('dropdown menu actions', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="*" element={<div>Test Content</div>} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    );

    // Open dropdown menu
    fireEvent.click(screen.getByText(/John Doe/));

    // Check if "View" and "Delete" options are available
    expect(screen.getByText(/View/)).toBeInTheDocument();
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
  });
});