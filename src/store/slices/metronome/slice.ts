import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MetronomeType} from "./types";

export const initialState: MetronomeType = {
    bpm: 70,
    beatsPerMeasure: 4
}

const metronomeSlice = createSlice({
    name: "metronome",
    initialState,
    reducers: {
        setBpm(state, action: PayloadAction<number>) {
            state.bpm = action.payload;
        }
    }
});

export const {setBpm} = metronomeSlice.actions;
export default metronomeSlice.reducer;