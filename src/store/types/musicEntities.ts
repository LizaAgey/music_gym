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

export function getNoteNameEnumValue(noteName: string): ENoteName {
    switch (noteName) {
        case 'C':
            return ENoteName.C;
        case 'C#':
            return ENoteName.CSharp;
        case 'D':
            return ENoteName.D;
        case 'D#':
            return ENoteName.DSharp;
        case 'E':
            return ENoteName.E;
        case 'F':
            return ENoteName.F;
        case 'F#':
            return ENoteName.FSharp;
        case 'G':
            return ENoteName.G;
        case 'G#':
            return ENoteName.GSharp;
        case 'A':
            return ENoteName.A;
        case 'A#':
            return ENoteName.ASharp;
        case 'B':
            return ENoteName.B;
        default:
            return ENoteName.C;
            ;
        // default: return undefined;
    }
}
