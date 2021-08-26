import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from "./todoSlice";
import { combineReducers } from "redux";
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    todo: todoReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
