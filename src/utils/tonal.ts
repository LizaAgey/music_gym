import {Chord, Mode} from "tonal";
import {ENoteName} from "../store/types/musicEntities";
import {NoteElementType} from "../store/slices/preset/types";
import {MyChord, Note} from "../store/slices/training/interval/types";

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
    let {tonic, intervals, notes, symbol} = Chord.get(chordName);
    if (!tonic || !notes) {
        return undefined;
    }

    const transformedNotes: Array<Note> = notes.map((note, index) => ({
        name: note,
        interval: intervals[index],
        checked: false
    }));

    return {
        name: symbol,
        key: tonic,
        notes: transformedNotes,
    };
}

export function getCleanNotes(): NoteElementType[] {
    return Object.values(ENoteName)
        .filter((note) => !note.includes("b") && !note.includes("#"))
        .map((n) => ({value: n}));
}

function getRomanNumber(chordName: string, degree: number): string {
    const chords = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    const chordRoot = chordName.slice(0, chordName.indexOf('m') > 0 ? chordName.indexOf('m') : chordName.indexOf('maj') > 0 ? chordName.indexOf('maj') : chordName.length).replace("#", "s").toUpperCase();
    const isMinor = chordName.includes('m') || chordName.includes('maj');
    const chordIndex = (chordRoot.charCodeAt(0) - 65 + (chordRoot.length > 1 ? 7 : 0)) % 7;
    const degreeIndex = (degree - 1) % 7;
    const romanNumeral = chords[(chordIndex + degreeIndex) % 7];
    return isMinor ? romanNumeral.toLowerCase() : romanNumeral;
}

