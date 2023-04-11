import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PersonalSettingsState} from "./types";

export const initialState: PersonalSettingsState = {
    countdown: false,
    countdownTimeSec: 5
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTrainingMode(state, action: PayloadAction<boolean>) {
            state.countdown = action.payload;
        },
        setCountdownTimeSec(state, action: PayloadAction<number>) {
            state.countdownTimeSec = action.payload;
        },

    }
});

export const {setCountdownTimeSec, setTrainingMode} = settingsSlice.actions;
export default settingsSlice.reducer;