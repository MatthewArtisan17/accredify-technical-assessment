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
    togglePersonal: (state) => {
      if (state.data) {
        state.data.current_organisation.is_personal = !state.data.current_organisation.is_personal;
      }
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

export const { logout, togglePersonal } = userSlice.actions; // Export the togglePersonal action
export default userSlice.reducer;