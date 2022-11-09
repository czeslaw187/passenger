import { combineReducers, configureStore } from '@reduxjs/toolkit';
import newSlice from './newSlice';
import kitchenSlice from './kitchenSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['food', 'activePage', 'isLogged', 'kitchen', 'order'],
};
const rootReducer = combineReducers({
   food: newSlice, kitchen: kitchenSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

const persistor = persistStore(store);
export { store, persistor };