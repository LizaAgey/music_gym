import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SettingsState} from "./types";
import {FormSettingsValuesType} from "../../../components/Sidebar/Sidebar";

export const initialState: SettingsState = {
    isInProgress: false,
    isSoundOn: false,
    isPaused: false,
    isRandom: true,
    isShowNext: false,
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        stopProgress(state) {
            state.isInProgress = false;
            state.isPaused = false;
        },
        switchPause(state) {
            state.isPaused = !state.isPaused;
        },
        saveSettings(state, action: PayloadAction<FormSettingsValuesType>) {
            state.isInProgress = true;
            state.isSoundOn = action.payload.soundMode;
            state.isShowNext = action.payload.isShowNext;
            state.isRandom = action.payload.isRandom;
        }
    }
});


export const {switchPause, stopProgress, saveSettings} = settingsSlice.actions;
export default settingsSlice.reducer;