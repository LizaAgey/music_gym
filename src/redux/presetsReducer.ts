import {v1} from 'uuid';
import {ActionsType} from './redux_store';

export type PresetsPageType = {
    presets: Array<PresetGroupType>
}
export type PresetElementType = {
    id: string
    value: string
    sound: string
}
export type PresetGroupType = {
    id: string
    elements: Array<PresetElementType>
    groupName: string
}

export const SELECT_PRESET = 'SELECT_PRESET'
export const selectPresetAС = () => ({type: SELECT_PRESET} as const)

const initialState: PresetsPageType = {
    presets: [
        {
            id: v1(),
            elements: [
                {id: v1(), value: 'cat_1', sound: './sounds/cat.wav'},
                {id: v1(), value: 'dog_1', sound: './sounds/dog.wav'},
                {id: v1(), value: 'frog_1', sound: './sounds/frog.wav'},
                {id: v1(), value: 'sheep_1', sound: './sounds/sheep.mp3'},
            ],
            groupName: 'Preset 1'
        },
        {
            id: v1(),
            elements: [
                {id: v1(), value: 'cat_2', sound: './sounds/cat.wav'},
                {id: v1(), value: 'dog_2', sound: './sounds/dog.wav'},
                {id: v1(), value: 'frog_2', sound: './sounds/frog.wav'},
                {id: v1(), value: 'sheep_2', sound: './sounds/sheep.mp3'},
            ],
            groupName: 'Preset 2'
        }
    ]
}
const profileReducer = (state: PresetsPageType = initialState, action: ActionsType): PresetsPageType => {

    switch (action.type) {
        case SELECT_PRESET:
            return state

        default:
            return state;
    }
};

export default profileReducer