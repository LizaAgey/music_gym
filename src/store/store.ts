import {configureStore} from '@reduxjs/toolkit'
import preset from "./slices/preset/slice";
import metronome from "./slices/metronome/slice";
import settings from "./slices/settings/slice";
import mainTraining from "./slices/training/main/slice";
import intervalTraining from "./slices/training/interval/slice";

import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        preset,
        metronome,
        settings,
        mainTraining,
        intervalTraining
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();