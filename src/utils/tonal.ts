import {Mode} from "tonal";
import {ENoteName} from "../store/types/musicEntities";
import {NoteElementType} from "../store/slices/preset/types";

// https://github.com/tonaljs/tonal
export function getChordsForDegree(modeName: string, tonic: string,
                                   chordProgression: Array<number>, seventhChords: boolean): Array<string> {
    let str: Array<string>
    if (seventhChords) {
        str = Mode.seventhChords(modeName, tonic);
    } else {
        str = Mode.triads(modeName, tonic)
    }
    return chordProgression.map(d => str[d - 1]);
}

export function getCleanNotes(): NoteElementType[] {
    return Object.values(ENoteName)
        .filter((note) => !note.includes("b") && !note.includes("#"))
        .map((n) => ({value: n}));
}
