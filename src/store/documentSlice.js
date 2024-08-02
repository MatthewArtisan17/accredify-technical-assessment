import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDocuments } from '../services/api';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchDocumentsAsync = createAsyncThunk('documents/fetchDocuments', async () => {
  return await fetchDocuments();
});

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocumentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocumentsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDocumentsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default documentSlice.reducer;