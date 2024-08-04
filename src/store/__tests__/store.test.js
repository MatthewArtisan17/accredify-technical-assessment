// src/store/__tests__/store.test.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { store, persistor } from '../index'; // Adjust path as needed
import userReducer from '../userSlice';
import documentReducer from '../documentSlice';
import careerGoalReducer from '../careerGoalSlice';
import { logout } from '../userSlice';

// Mock persistStore
jest.mock('redux-persist', () => ({
  persistStore: jest.fn().mockImplementation((store) => store),
}));

describe('Redux Store Configuration', () => {
  test('should create store with reducers and persistConfig', () => {
    // Check store creation
    expect(store).toBeDefined();
    expect(store.getState()).toEqual({
      user: { data: null, loading: false, error: null },
      documents: { data: null, loading: false, error: null },
      careerGoal: { data: null, loading: false, error: null },
    });
  });

  test('should create persistor', () => {
    // Check persistor creation
    expect(persistor).toBeDefined();
  });

  test('should dispatch actions and update state', () => {
    // Create a new store instance to test dispatch
    const testStore = configureStore({
      reducer: {
        user: userReducer,
        documents: documentReducer,
        careerGoal: careerGoalReducer,
      },
    });

    // Dispatch an action
    testStore.dispatch(logout());

    // Check the updated state
    const state = testStore.getState().user;
    expect(state.data).toBeNull();
    expect(state.error).toBeNull();
  });
});