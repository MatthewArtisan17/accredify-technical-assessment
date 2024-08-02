import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCareerGoal } from '../services/api';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchCareerGoalAsync = createAsyncThunk('careerGoal/fetchCareerGoal', async () => {
  return await fetchCareerGoal();
});

const careerGoalSlice = createSlice({
  name: 'careerGoal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareerGoalAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCareerGoalAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCareerGoalAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default careerGoalSlice.reducer;