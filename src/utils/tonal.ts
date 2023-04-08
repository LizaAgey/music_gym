import {Mode} from "tonal";

// https://github.com/tonaljs/tonal
export function getChordsForDegree(modeName: string, tonic: string, chordProgression: Array<number>): Array<string> {
    let str: Array<string> = Mode.seventhChords(modeName, tonic);
    return chordProgression.map(d => str[d - 1]);
}
