import {PresetMode, PresetType} from "../store/slices/settings/types";

export const presetsInitialData: Array<PresetType>  = [
    {
        id: 1,
        title: 'All notes with sharps',
        type: PresetMode.NOTE,
        elements: [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]
    },
    {
        id: 2,
        title: 'All clean notes',
        type: PresetMode.NOTE,
        elements: [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ]

    },
    {
        id: 3,
        title: '2 - 5 - 1',
        type: PresetMode.DEGREE,
        elements: [ 2, 5, 1 ]
    }
]