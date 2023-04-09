import {ECategory, EPresetMode, PresetType} from "../store/slices/preset/types";
import {EModeName, ENoteName} from "../store/types/musicEntities";

export type StoredPresetType = {
    title: string
    type: EPresetMode
    elements?: Array<number | string>
    category?: ECategory
    key?: ENoteName.C,
    mode?: EModeName.IONIAN
}

export const presetsInitialData: Array<StoredPresetType> = [
    {
        title: 'All notes',
        type: EPresetMode.NOTE,
        elements: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    },
    {
        title: 'All clean notes',
        type: EPresetMode.NOTE,
        elements: ['C', 'D', 'E', 'F', 'G', 'A', 'B']

    },
    {
        title: '2 - 5 - 1',
        type: EPresetMode.DEGREE,
        category: ECategory.BLUES,
        elements: [2, 5, 1]
    },
    {
        title: '4 - 5 - 2 - 3 - 1',
        type: EPresetMode.DEGREE,
        category: ECategory.BLUES,
        elements: [4, 5, 2, 3, 1]
    },
    {
        title: 'C Major',
        type: EPresetMode.SCALE,
        key: ENoteName.C,
        mode: EModeName.IONIAN
    }
]