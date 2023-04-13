import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IntervalTrainingState, MyChord} from "./types";
import {transformToMyChord} from "../../../../utils/tonal";
import {NoteAnalyzer} from "../../../../utils/audioUtils";


const initialState: IntervalTrainingState = {
    rawElements: [],
    currentChord: {
        name: "",
        key: "",
        notes: []
    },
    currentChordIndex: 0,
    currentExpectedNote: "",
    currentExpectedNoteIndex: 0,
    nextChordIndex: 0,

    noteAnalyser: {
        closestNoteName: "",
        closestNoteFrequency: 0,
        closestMidiNoteNumber: 0
    }
}

const intervalTrainingSlice = createSlice({
    name: "interval_training",
    initialState,
    reducers: {
        setRawElements(state, action: PayloadAction<Array<string>>) {
            state.rawElements = action.payload;
            let chord = transformToMyChord(action.payload[0]);
            if (chord) {
                state.currentChord = chord;
                state.currentExpectedNote = chord.notes[0].name;
            }
        },
        setNoteAnalyser(state, action: PayloadAction<NoteAnalyzer>) {
            state.noteAnalyser = action.payload;
            if (state.noteAnalyser.closestNoteName === state.currentExpectedNote) {
                state.nextChordIndex = (state.nextChordIndex + 1) % state.rawElements.length;
                if (state.nextChordIndex === 0) {
                    // New chord cycle
                    const chord: MyChord | undefined = transformToMyChord(state.rawElements[state.nextChordIndex])
                    if (chord) {
                        state.currentChord = chord;
                        state.currentChordIndex = 1;
                        state.currentExpectedNote = chord.notes[0].name;
                        state.currentExpectedNoteIndex = 0;
                    } else {
                        throw new Error(`Cannot transform tonal chord to my chord ${state.rawElements[state.nextChordIndex]}`);
                    }
                } else {
                    // New degree cycle
                    state.currentChord.notes[state.currentExpectedNoteIndex].checked = true;
                    state.currentExpectedNoteIndex = (state.currentExpectedNoteIndex + 1) % state.currentChord.notes.length;
                    state.currentExpectedNote = state.currentChord.notes[state.currentExpectedNoteIndex].name;
                }
            }
        }
    }
});


export const {setNoteAnalyser, setRawElements} = intervalTrainingSlice.actions;
export default intervalTrainingSlice.reducer;