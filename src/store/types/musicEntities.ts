import { Chord } from "@tonaljs/tonal";

export interface Note {
    name: ENoteName;
    octave: number;
}

export interface Mode {
    name: EModeName;
    intervals: number[];
}

export interface Degree {
    value: number;
    name: string;
    interval: number;
}

export enum ENoteName {
    C = 'C',
    CSharp = 'C#',
    D = 'D',
    DSharp = 'D#',
    E = 'E',
    F = 'F',
    FSharp = 'F#',
    G = 'G',
    GSharp = 'G#',
    A = 'A',
    ASharp = 'A#',
    B = 'B'
}

export enum EModeName {
    IONIAN = 'Ionian',
    DORIAN = 'Dorian',
    PHRYGIAN = 'Phrygian',
    LYDIAN = 'Lydian',
    MIXOLYDIAN = 'Mixolydian',
    AEOLIAN = 'Aeolian',
    LOCRIAN = 'Locrian'
}
