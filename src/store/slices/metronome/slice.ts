import {createSlice} from "@reduxjs/toolkit";
import {MetronomeType} from "./types";

export const initialState: MetronomeType = {
    bpm: 70,
    beatsPerMeasure: 4
}

const metronomeSlice = createSlice({
    name: "metronome",
    initialState,
    reducers: {}
});

export const {} = metronomeSlice.actions;
export default metronomeSlice.reducer;