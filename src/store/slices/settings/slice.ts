import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PresetType, SettingsPageType} from "./types";
import {FormSettingsValuesType} from "../../../components/Sidebar/Sidebar";

export const initialState: SettingsPageType = {
    preset: null,
    trainingPeriod: 3,
    beats: 4,
    interval: 2,
    isInProgress: false,
    isSoundOn: false,
    isPaused: false,
    presetsInitialData: []
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        initPresets(state, action: PayloadAction<Array<PresetType>>) {
            state.presetsInitialData = action.payload;
        },
        stopProgress(state) {
            state.isInProgress = false;
        },
        switchPause(state) {
            state.isPaused = !state.isPaused;
        },
        setPreset(state, action: PayloadAction<PresetType>) {
            state.preset = action.payload;
        },
        saveSettings(state, action: PayloadAction<FormSettingsValuesType>) {
            action.payload;
        }
    }
});

export const {initPresets, switchPause, stopProgress, setPreset, saveSettings} = settingsSlice.actions;
export default settingsSlice.reducer;