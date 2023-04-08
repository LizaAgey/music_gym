import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EPresetMode, PresetType, SettingsPageType} from "./types";
import {FormSettingsValuesType} from "../../../components/Sidebar/Sidebar";
import {getChordsForDegree} from "../../../utils/tonal";

export const initialState: SettingsPageType = {
    preset: {
        id: 0,
        title: 'Preset 1',
        elements: [],
        type: EPresetMode.UNDEFINED
    },
    rawElements: [],
    trainingPeriod: 3,
    bpm: 70,
    beats: 4,
    interval: 2,
    isInProgress: false,
    isSoundOn: true,
    isPaused: false,
    isRandom: true,
    isShowNext: false,
    presetsInitialData: [],
    progressionSettings: {
        key: "C",
        major: true,
        seventhChords: true
    }
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
        setKey(state, action: PayloadAction<string>) {
            state.progressionSettings.key = action.payload;
            state.rawElements = getChordsForDegree(
                state.progressionSettings.major ? "major" : "minor",
                state.progressionSettings.key,
                state.preset.elements.map((element) => Number(element)));
        },
        setPreset(state, action: PayloadAction<PresetType>) {
            state.preset = action.payload;
            if (action.payload.type === EPresetMode.NOTE) {
                // @ts-ignore
                state.rawElements = action.payload.elements;
            } else if (action.payload.type === EPresetMode.DEGREE) {
                // @ts-ignore
                state.rawElements = getChordsForDegree("major", "C", action.payload.elements);
            }

        },
        saveSettings(state, action: PayloadAction<FormSettingsValuesType>) {
            state.isInProgress = true;
            state.bpm = action.payload.bpm;
            state.isSoundOn = action.payload.soundMode;
            state.isShowNext = action.payload.isShowNext;
            state.isRandom = action.payload.isRandom;
        }
    }
});

export const {initPresets, switchPause, stopProgress, setPreset, saveSettings, setKey} = settingsSlice.actions;
export default settingsSlice.reducer;