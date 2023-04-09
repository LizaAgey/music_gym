import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EPresetMode, PresetsDataType} from "./types";
import {getChordsForDegree} from "../../../utils/tonal";
import {ProgressionSettings} from "../progression/types";
import {Preset} from "./PresetData";
import {ENoteName} from "../../types/musicEntities";

export const initialState: PresetsDataType = {
    currentPreset: {
        id: 1,
        title: 'All notes with sharps',
        type: EPresetMode.NOTE,
        elements: Object.values(ENoteName)
            .map((n) => ({value: n}))
    },
    allPresets: []
}

const progressionSlice = createSlice({
    name: "progression",
    initialState,
    reducers: {
        setPreset(state, action: PayloadAction<Preset>) {
            state.currentPreset = action.payload;
        },
        setRawElements(state, action: PayloadAction<ProgressionSettings>) {
            if (state.currentPreset.type === EPresetMode.DEGREE) {
                if (state.currentPreset.elements.every((element) => typeof element.value == "number")) {
                    const arr: Array<string> = getChordsForDegree(
                        action.payload.mode,
                        action.payload.key,
                        state.currentPreset.elements.map(el => el.value as number),
                        action.payload.seventhChords);
                    state.rawElements = arr;
                }
            } else {
                state.rawElements = [];
            }
        },
        setRawNotes(state) {
            state.rawElements = state.currentPreset.elements.map(el => el.value.toString());
        },
        initializeState: (state, action: PayloadAction<Array<Preset>>) => {
            state.allPresets = action.payload;
            // state.currentPreset = state.allPresets[0];
        }
    }
});

export const {initializeState, setRawElements, setPreset, setRawNotes} = progressionSlice.actions;
export default progressionSlice.reducer;