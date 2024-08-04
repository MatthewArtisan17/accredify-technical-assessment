import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from '../services/api';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchUserAsync = createAsyncThunk('user/fetchUser', async () => {
  return await fetchUser();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions; // Export the logout action
export default userSlice.reducer;