import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ETrainingMode, TrainingState} from "./types";
import {FormSettingsValuesType} from "../../../components/Sidebar/Sidebar";

export const initialState: TrainingState = {
    isInProgress: false,
    isSoundOn: false,
    isPaused: false,
    isRandom: true,
    isShowNext: false,
    trainingMode: ETrainingMode.METRONOME
}

const trainingSlice = createSlice({
    name: "training",
    initialState,
    reducers: {
        stopProgress(state) {
            state.isInProgress = false;
            state.isPaused = false;
        },
        switchPause(state) {
            state.isPaused = !state.isPaused;
        },
        setTrainingMode(state, action: PayloadAction<ETrainingMode>) {
            state.trainingMode = action.payload;
        },
        saveSettings(state, action: PayloadAction<FormSettingsValuesType>) {
            state.isInProgress = true;
            state.isSoundOn = action.payload.soundMode;
            state.isShowNext = action.payload.isShowNext;
            state.isRandom = action.payload.isRandom;
        }
    }
});


export const {setTrainingMode, switchPause, stopProgress, saveSettings} = trainingSlice.actions;
export default trainingSlice.reducer;