import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ECategory, EPresetMode, PresetsDataType} from "./types";
import {ENoteName} from "../../types/musicEntities";
import {getChordsForDegree, getCleanNotes} from "../../../utils/tonal";
import {ProgressionSettings} from "../progression/types";

export const initialState: PresetsDataType = {
    presetId: 1,
    currentPreset: {
        id: 1,
        title: 'All notes with sharps',
        type: EPresetMode.NOTE,
        elements: Object.values(ENoteName)
            .map((n) => ({value: n}))
    },
    allPresets: [
        {
            id: 1,
            title: 'All notes with sharps',
            type: EPresetMode.NOTE,
            elements: Object.values(ENoteName)
                .map((n) => ({value: n}))
        },
        {
            id: 2,
            title: 'All clean notes',
            type: EPresetMode.NOTE,
            elements: getCleanNotes()

        },
        {
            id: 3,
            title: '2 - 5 - 1',
            type: EPresetMode.DEGREE,
            category: ECategory.BLUES,
            elements: [{value: 2}, {value: 5}, {value: 1}]
        },
        {
            id: 4,
            title: '3 - 2 - 9 - 1',
            type: EPresetMode.DEGREE,
            category: ECategory.BLUES,
            elements: [{value: 3}, {value: 2}, {value: 4}, {value: 1}]

        }
    ]
}

const progressionSlice = createSlice({
    name: "progression",
    initialState,
    reducers: {
        setPresetId(state, action: PayloadAction<number>) {
            state.presetId = action.payload;
            state.currentPreset = state.allPresets.find(p => p.id === state.presetId)!
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
        }
    }
});

export const {setRawElements, setPresetId, setRawNotes} = progressionSlice.actions;
export default progressionSlice.reducer;