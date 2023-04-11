import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EPresetMode, PresetsDataType, Progression} from "./types";
import {getChordsForDegree} from "../../../utils/tonal";
import {Preset} from "./PresetData";
import {EModeName, ENoteName} from "../../types/musicEntities";
import {Mode} from "tonal";


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

function recalculateRawValueForProgression(state: PresetsDataType) {
    const pr: Progression | undefined = state.currentPreset.progression;
    if (pr) {
        if (state.currentPreset.type === EPresetMode.DEGREE) {
            const arr: Array<string> = getChordsForDegree(
                pr.mode,
                pr.key,
                state.currentPreset.elements.map(el => el.value as number),
                pr.seventhChords);
            state.rawElements = arr;
        } else if (state.currentPreset.type === EPresetMode.SCALE) {
            state.rawElements = pr.seventhChords
                ? Mode.seventhChords(pr.mode, pr.key)
                : Mode.triads(pr.mode, pr.key);
        }
    }
}

const progressionSlice = createSlice({
    name: "progression",
    initialState,
    reducers: {
        setPreset(state, action: PayloadAction<Preset>) {
            state.currentPreset = action.payload;
            const pr: Progression | undefined = state.currentPreset.progression;

            if (state.currentPreset.type === EPresetMode.DEGREE) {
                recalculateRawValueForProgression(state);
            } else if (state.currentPreset.type === EPresetMode.SCALE) {
                if (pr) {
                    state.rawElements = pr.seventhChords
                        ? Mode.seventhChords(pr.mode, pr.key)
                        : Mode.triads(pr.mode, pr.key);
                }
            } else if (state.currentPreset.type === EPresetMode.NOTE) {
                state.rawElements = state.currentPreset.elements.map(el => el.value.toString());
            } else {
                state.rawElements = [];
            }
        },
        initializeState: (state, action: PayloadAction<Array<Preset>>) => {
            state.allPresets = action.payload;
            // state.currentPreset = state.allPresets[0];
        },
        setSeventhChords(state, action: PayloadAction<boolean>) {
            if (state.currentPreset.progression) {
                state.currentPreset.progression.seventhChords = action.payload;
            }
            recalculateRawValueForProgression(state);
        },
        setKey(state, action: PayloadAction<string>) {
            if (state.currentPreset.progression) {
                state.currentPreset.progression.key = ENoteName[action.payload as keyof typeof ENoteName];
            }
            recalculateRawValueForProgression(state);
        },
        setMode(state, action: PayloadAction<string>) {
            if (state.currentPreset.progression) {
                state.currentPreset.progression.mode = EModeName[action.payload.toUpperCase() as keyof typeof EModeName];
            }
            recalculateRawValueForProgression(state);
        }
    }
});

export const {initializeState, setKey, setMode, setSeventhChords, setPreset} = progressionSlice.actions;
export default progressionSlice.reducer;