import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '../../../matchMedia';
import LoginPage from '../LoginPage';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('LoginPage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders LoginPage and form elements', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('submits the form and redirects', async () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Simulate a delay for loading
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Login/i })).toBeDisabled();
    });

    // Simulate a redirect
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  test('shows loading state when form is submitted', async () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByRole('button', { name: /Login/i })).toBeDisabled();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Login/i })).toBeEnabled();
    });
  });
});