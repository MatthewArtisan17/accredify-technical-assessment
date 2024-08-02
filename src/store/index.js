import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import documentReducer from './documentSlice';
import careerGoalReducer from './careerGoalSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    documents: documentReducer,
    careerGoal: careerGoalReducer,
  },
});

export default store;