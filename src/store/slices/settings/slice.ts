import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SettingsState} from "./types";
import {FormSettingsValuesType} from "../../../components/Sidebar/Sidebar";

export const initialState: SettingsState = {
    isInProgress: false,
    isSoundOn: true,
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

        // setPreset(state, action: PayloadAction<PresetType>) {
        //     state.preset = action.payload;
        //     if (action.payload.type === EPresetMode.NOTE) {
        //         // @ts-ignore
        //         state.rawElements = action.payload.elements;
        //     } else if (action.payload.type === EPresetMode.DEGREE) {
        //         // @ts-ignore
        //         state.rawElements = getChordsForDegree("major", "C", action.payload.elements);
        //     }
        //
        // },

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