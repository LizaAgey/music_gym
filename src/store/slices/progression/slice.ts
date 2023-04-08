import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProgressionSettings} from "./types";
import {EModeName, ENoteName} from "../../types/musicEntities";


export const initialState: ProgressionSettings = {
    key: ENoteName.C,
    mode: EModeName.IONIAN,
    seventhChords: true,
    progression: [2, 5, 1]
}

const progressionSlice = createSlice({
    name: "progression",
    initialState,
    reducers: {
        setSeventhChords(state, action: PayloadAction<boolean>) {
            state.seventhChords = action.payload;
        },
        setKey(state, action: PayloadAction<string>) {
            state.key = ENoteName[action.payload as keyof typeof ENoteName];
        },
        setMode(state, action: PayloadAction<string>) {
            state.mode = EModeName[action.payload.toUpperCase() as keyof typeof EModeName];
        },
    }
});

export const {setKey, setSeventhChords, setMode} = progressionSlice.actions;
export default progressionSlice.reducer;