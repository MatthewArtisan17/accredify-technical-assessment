// src/layouts/__tests__/MainLayout.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from '../MainLayout';
import { persistor } from '../../store';
import { logout, togglePersonal } from '../../store/userSlice';

jest.mock('../../store', () => ({
  persistor: { purge: jest.fn() },
}));

const mockStore = configureStore([]);

const initialState = {
  user: {
    data: {
      name: 'John Doe',
      current_organisation: { is_personal: false },
    },
  },
};

describe('MainLayout', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  test('renders MainLayout and user information', () => {
    render(
      <Provider store={store}>
        <Router>
          <MainLayout />
        </Router>
      </Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('handles Toggle Personal button click', () => {
    render(
      <Provider store={store}>
        <Router>
          <MainLayout />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('Toggle Personal'));
    expect(store.dispatch).toHaveBeenCalledWith(togglePersonal());
  });

  test('handles Logout button click', async () => {
    render(
      <Provider store={store}>
        <Router>
          <MainLayout />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /log out/i }));
    expect(persistor.purge).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });

  test('renders Sidebar with username', () => {
    render(
      <Provider store={store}>
        <Router>
          <MainLayout />
        </Router>
      </Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('renders Outlet', () => {
    render(
      <Provider store={store}>
        <Router>
          <MainLayout />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });
});