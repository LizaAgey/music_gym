import {PresetMode, PresetType} from "../store/slices/settings/types";

export const presetsInitialData: Array<PresetType>  = [
    {
        id: 1,
        name: 'All notes with sharps',
        type: PresetMode.NOTE,
        elements: [
            {id: 1, value: 'C', sound: ''},
            {id: 2, value: 'C#', sound: ''},
            {id: 3, value: 'D', sound: ''},
            {id: 4, value: 'D#', sound: ''},
            {id: 5, value: 'E', sound: ''},
            {id: 6, value: 'F', sound: ''},
            {id: 7, value: 'F#', sound: ''},
            {id: 8, value: 'G', sound: ''},
            {id: 9, value: 'G#', sound: ''},
            {id: 10, value: 'A', sound: ''},
            {id: 11, value: 'A#', sound: ''},
            {id: 12, value: 'B', sound: ''},
        ]
    },
    {
        id: 2,
        name: 'All clean notes',
        type: PresetMode.NOTE,
        elements: [
            {id: 1, value: 'C', sound: ''},
            {id: 3, value: 'D', sound: ''},
            {id: 5, value: 'E', sound: ''},
            {id: 6, value: 'F', sound: ''},
            {id: 8, value: 'G', sound: ''},
            {id: 10, value: 'A', sound: ''},
            {id: 12, value: 'B', sound: ''}
        ]
    },

]