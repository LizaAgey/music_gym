import {configureStore} from '@reduxjs/toolkit'
import settings from "./slices/settings/slice";
import preset from "./slices/preset/slice";
import metronome from "./slices/metronome/slice";

import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        settings,
        preset,
        metronome
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();