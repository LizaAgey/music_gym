import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PresetMode, PresetType, SettingsPageType} from "./types";
import {FormSettingsValuesType} from "../../../components/Sidebar/Sidebar";

export const initialState: SettingsPageType = {
    preset: {
        id: 0,
        name: 'Preset 1',
        elements: [],
        type: PresetMode.UNDEFINED
    },
    trainingPeriod: 3,
    bpm: 120,
    beats: 4,
    interval: 2,
    isInProgress: false,
    isSoundOn: true,
    isPaused: false,
    isShowNext: false,
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
            state.isPaused = false;
        },
        switchPause(state) {
            state.isPaused = !state.isPaused;
        },
        setPreset(state, action: PayloadAction<PresetType>) {
            state.preset = action.payload;
        },
        saveSettings(state, action: PayloadAction<FormSettingsValuesType>) {
            state.isInProgress = true;
            state.bpm = action.payload.bpm;
            state.isSoundOn = action.payload.soundMode;
            state.isShowNext = action.payload.isShowNext;
        }
    }
});

export const {initPresets, switchPause, stopProgress, setPreset, saveSettings} = settingsSlice.actions;
export default settingsSlice.reducer;