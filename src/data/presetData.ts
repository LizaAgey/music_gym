import {ECategory, EPresetMode, PresetType} from "../store/slices/preset/types";
import {EModeName, ENoteName} from "../store/types/musicEntities";

export type StoredPresetType = {
    title: string
    type: EPresetMode
    elements?: Array<number | string>
    category?: ECategory
    key?: ENoteName,
    mode?: EModeName
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
        title: '4 - 5 - 1',
        type: EPresetMode.DEGREE,
        elements: [4, 5, 1]
    },
    {
        title: '4 - 5 - 2 - 3 - 1',
        type: EPresetMode.DEGREE,
        category: ECategory.BLUES,
        elements: [4, 5, 2, 3, 1]
    },
    {
        title: 'TEST 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8',
        type: EPresetMode.DEGREE,
        elements: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
        title: '3 - 6 - 2 - 5 - 1',
        type: EPresetMode.DEGREE,
        category: ECategory.JAZZ,
        elements: [3, 6, 2, 5, 1]
    },
    {
        title: 'Ionian / Major',
        type: EPresetMode.SCALE,
        key: ENoteName.C,
        mode: EModeName.IONIAN
    },
    {
        title: 'Natural Minor',
        type: EPresetMode.SCALE,
        key: ENoteName.A,
        mode: EModeName.AEOLIAN
    }
]