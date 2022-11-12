import { combineReducers, configureStore } from '@reduxjs/toolkit';
import newSlice from './newSlice';
import kitchenSlice from './kitchenSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import archiveSlice from './archiveSlice';
const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['food', 'activePage', 'isLogged', 'kitchen', 'order', 'archive'],
};
const rootReducer = combineReducers({
   food: newSlice, kitchen: kitchenSlice, archive: archiveSlice
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