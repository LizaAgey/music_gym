import {ECategory, EPresetMode, PresetType} from "../store/slices/settings/types";

export const presetsInitialData: Array<PresetType>  = [
    {
        id: 1,
        title: 'All notes with sharps',
        type: EPresetMode.NOTE,
        elements: [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]
    },
    {
        id: 2,
        title: 'All clean notes',
        type: EPresetMode.NOTE,
        elements: [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ]

    },
    {
        id: 3,
        title: '2 - 5 - 1',
        type: EPresetMode.DEGREE,
        category: ECategory.BLUES,
        elements: [ 2, 5, 1 ]
    },
    {
        id: 4,
        title: '3 - 2 - 9 - 1',
        type: EPresetMode.DEGREE,
        category: ECategory.BLUES,
        elements: [ 2, 5, 1 ]
    },
    {
        id: 5,
        title: '3 - 1 - 7',
        type: EPresetMode.DEGREE,
        category: ECategory.POP,
        elements: [ 2, 5, 1 ]
    }
]