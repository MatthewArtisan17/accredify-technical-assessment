import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from '../HomePage';
import userReducer from '../../store/userSlice';
import documentReducer from '../../store/documentSlice';
import careerGoalReducer from '../../store/careerGoalSlice';
import { fetchUserAsync } from '../../store/userSlice';
import { fetchDocumentsAsync } from '../../store/documentSlice';
import { fetchCareerGoalAsync } from '../../store/careerGoalSlice';

// Mock the API calls
jest.mock('../../services/api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ name: 'John Doe', current_organisation: { is_personal: false } }),
  fetchDocuments: jest.fn().mockResolvedValue([{ id: 1, name: 'Document 1' }]),
  fetchCareerGoal: jest.fn().mockResolvedValue({ name: 'Become a Developer', progress: 50 }),
}));

const store = configureStore({
  reducer: {
    user: userReducer,
    documents: documentReducer,
    careerGoal: careerGoalReducer,
  },
  preloadedState: {
    user: { data: null, loading: false, error: null },
    documents: { data: [], status: 'idle', error: null },
    careerGoal: { data: null, status: 'idle', error: null },
  },
});

describe('HomePage', () => {
  test('should display loading spinner while fetching data', async () => {
    // Set loading states
    store.dispatch(fetchUserAsync.pending());
    store.dispatch(fetchDocumentsAsync.pending());
    store.dispatch(fetchCareerGoalAsync.pending());

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('should display user name and documents after loading', async () => {
    // Simulate data loaded
    store.dispatch(fetchUserAsync.fulfilled({ name: 'John Doe', current_organisation: { is_personal: false } }));
    store.dispatch(fetchDocumentsAsync.fulfilled([{ id: 1, name: 'Document 1' }]));
    store.dispatch(fetchCareerGoalAsync.fulfilled({ name: 'Become a Developer', progress: 50 }));

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Hi, John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Document 1/i)).toBeInTheDocument();
    });
  });

  test('should handle error state', async () => {
    // Simulate error
    store.dispatch(fetchUserAsync.rejected(new Error('Failed to fetch')));
    store.dispatch(fetchDocumentsAsync.rejected(new Error('Failed to fetch')));
    store.dispatch(fetchCareerGoalAsync.rejected(new Error('Failed to fetch')));

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    // Handle error display if implemented
    await waitFor(() => {
      expect(screen.getByText(/Error fetching data:/i)).toBeInTheDocument();
    });
  });

  test('should conditionally render CareerGoal component', async () => {
    // Simulate data loaded
    store.dispatch(fetchUserAsync.fulfilled({ name: 'John Doe', current_organisation: { is_personal: false } }));
    store.dispatch(fetchDocumentsAsync.fulfilled([{ id: 1, name: 'Document 1' }]));
    store.dispatch(fetchCareerGoalAsync.fulfilled({ name: 'Become a Developer', progress: 50 }));

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Career Goal/i)).toBeInTheDocument();
    });
  });
});