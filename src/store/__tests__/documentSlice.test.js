// src/store/__tests__/documentSlice.test.js

import { configureStore } from '@reduxjs/toolkit';
import documentReducer, { fetchDocumentsAsync } from '../documentSlice';
import { fetchDocuments } from '../../services/api';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchDocuments: jest.fn(),
}));

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

describe('documentSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { documents: documentReducer },
      preloadedState: { documents: initialState },
    });
  });

  test('should handle fetchDocumentsAsync.pending', () => {
    // Dispatch fetchDocumentsAsync.pending action
    store.dispatch(fetchDocumentsAsync.pending());

    const state = store.getState().documents;
    expect(state.status).toBe('loading');
  });

  test('should handle fetchDocumentsAsync.fulfilled', async () => {
    const documentsData = [{ id: 1, name: 'Document 1' }];
    fetchDocuments.mockResolvedValue(documentsData);

    await store.dispatch(fetchDocumentsAsync());

    const state = store.getState().documents;
    expect(state.status).toBe('succeeded');
    expect(state.data).toEqual(documentsData);
    expect(state.error).toBeNull();
  });

  test('should handle fetchDocumentsAsync.rejected', async () => {
    fetchDocuments.mockRejectedValue(new Error('Failed to fetch'));

    await store.dispatch(fetchDocumentsAsync());

    const state = store.getState().documents;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch');
  });

  // Additional test cases to improve coverage
  test('should handle fetchDocumentsAsync with empty data', async () => {
    fetchDocuments.mockResolvedValue([]);

    await store.dispatch(fetchDocumentsAsync());

    const state = store.getState().documents;
    expect(state.status).toBe('succeeded');
    expect(state.data).toEqual([]);
    expect(state.error).toBeNull();
  });
});