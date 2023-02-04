import {configureStore} from '@reduxjs/toolkit'
import settings from "./slices/settings/slice";

import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        settings
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();