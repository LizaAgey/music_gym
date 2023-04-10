import {Chord, Mode} from "tonal";
import {ENoteName, MyChord, Note} from "../store/types/musicEntities";
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

export function transformToMyChord(chordName: string): MyChord | undefined {
    let {tonic, intervals, notes, name} = Chord.get(chordName);
    if (!tonic || !notes) {
        return undefined;
    }

    const transformedNotes: Array<Note> = notes.map((note, index) => ({
        name: note,
        interval: intervals[index]
    }));

    return {
        name: name,
        key: tonic,
        notes: transformedNotes,
    };
}

export function getCleanNotes(): NoteElementType[] {
    return Object.values(ENoteName)
        .filter((note) => !note.includes("b") && !note.includes("#"))
        .map((n) => ({value: n}));
}
