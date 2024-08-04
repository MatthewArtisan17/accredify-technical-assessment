import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import documentReducer from './documentSlice';
import careerGoalReducer from './careerGoalSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  user: persistReducer({ ...persistConfig, key: 'user' }, userReducer),
  documents: persistReducer({ ...persistConfig, key: 'documents' }, documentReducer),
  careerGoal: persistReducer({ ...persistConfig, key: 'careerGoal' }, careerGoalReducer),
};

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };