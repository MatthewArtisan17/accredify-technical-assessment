// src/store/__tests__/userSlice.test.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer, { logout, togglePersonal, fetchUserAsync } from '../userSlice';
import { fetchUser } from '../../services/api';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchUser: jest.fn(),
}));

const initialState = {
  data: null,
  loading: false,
  error: null,
};

describe('userSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { user: userReducer },
      preloadedState: { user: initialState },
    });
  });

  test('should handle logout', () => {
    // Set initial state with data and error
    store = configureStore({
      reducer: { user: userReducer },
      preloadedState: { user: { data: { current_organisation: { is_personal: true } }, error: 'Some error' } },
    });

    // Dispatch logout action
    store.dispatch(logout());

    const state = store.getState().user;
    expect(state.data).toBeNull();
    expect(state.error).toBeNull();
  });

  test('should handle togglePersonal', () => {
    // Set initial state with data
    store = configureStore({
      reducer: { user: userReducer },
      preloadedState: { user: { data: { current_organisation: { is_personal: false } }, error: null } },
    });

    // Dispatch togglePersonal action
    store.dispatch(togglePersonal());

    const state = store.getState().user;
    expect(state.data.current_organisation.is_personal).toBe(true);

    // Test the toggle again
    store.dispatch(togglePersonal());
    expect(state.data.current_organisation.is_personal).toBe(false);
  });

  test('should handle fetchUserAsync.pending', () => {
    // Dispatch fetchUserAsync.pending action
    store.dispatch(fetchUserAsync.pending());

    const state = store.getState().user;
    expect(state.loading).toBe(true);
  });

  test('should handle fetchUserAsync.fulfilled', async () => {
    const userData = { name: 'John Doe' };
    fetchUser.mockResolvedValue(userData);

    await store.dispatch(fetchUserAsync());

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(userData);
    expect(state.error).toBeNull();
  });

  test('should handle fetchUserAsync.rejected', async () => {
    fetchUser.mockRejectedValue(new Error('Failed to fetch'));

    await store.dispatch(fetchUserAsync());

    const state = store.getState().user;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch');
  });

  // Additional test cases to improve coverage
  test('should handle togglePersonal when data is null', () => {
    store = configureStore({
      reducer: { user: userReducer },
      preloadedState: { user: { data: null, error: null } },
    });

    store.dispatch(togglePersonal());

    const state = store.getState().user;
    expect(state.data).toBeNull(); // Ensure state.data remains null
  });
});