// src/store/__tests__/careerGoalSlice.test.js
import { configureStore } from '@reduxjs/toolkit';
import { fetchCareerGoalAsync } from '../careerGoalSlice';
import careerGoalReducer from '../careerGoalSlice';
import { fetchCareerGoal } from '../../services/api';

jest.mock('../../services/api'); // Mock the API module

describe('careerGoalSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        careerGoal: careerGoalReducer,
      },
    });
  });

  test('should have initial state', () => {
    const state = store.getState().careerGoal;
    expect(state).toEqual({
      data: null,
      status: 'idle',
      error: null,
    });
  });

  test('should handle fetchCareerGoalAsync.pending', () => {
    store.dispatch(fetchCareerGoalAsync.pending());
    const state = store.getState().careerGoal;
    expect(state.status).toBe('loading');
  });

  test('should handle fetchCareerGoalAsync.fulfilled', async () => {
    const mockData = { careerGoal: 'test goal' };
    fetchCareerGoal.mockResolvedValue(mockData);

    await store.dispatch(fetchCareerGoalAsync());

    const state = store.getState().careerGoal;
    expect(state.status).toBe('succeeded');
    expect(state.data).toEqual(mockData);
  });

  test('should handle fetchCareerGoalAsync.rejected', async () => {
    const mockError = 'Error fetching career goal';
    fetchCareerGoal.mockRejectedValue(new Error(mockError));

    await store.dispatch(fetchCareerGoalAsync());

    const state = store.getState().careerGoal;
    expect(state.status).toBe('failed');
    expect(state.error).toBe(mockError);
  });
});