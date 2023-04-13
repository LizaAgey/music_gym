import {NoteAnalyzer} from "../../../../utils/audioUtils";

export type MyChord = {
    name: string;
    key: string;
    notes: Array<Note>
}

export type Note = {
    name: string;
    interval: string;
    checked: boolean;
}

export type IntervalTrainingState = {
    rawElements: Array<string>,

    currentChord: MyChord
    currentChordIndex: number
    nextChordIndex: number

    currentExpectedNote: string
    currentExpectedNoteIndex: number

    noteAnalyser: NoteAnalyzer
}