import {createSlice} from "@reduxjs/toolkit";
import {ETrainingMode, PersonalSettingsState} from "./types";

export const initialState: PersonalSettingsState = {
    countdown: false,
    countdownTimeSec: 5
}

const personalSettings = createSlice({
    name: "personal_settings",
    initialState,
    reducers: {
        setCountdown(state) {
            state.isInProgress = false;
            state.isPaused = false;
        },
    }
});


export const {setTrainingMode, switchPause, stopProgress, saveSettings} = personalSettings.actions;
export default settingsSlice.reducer;