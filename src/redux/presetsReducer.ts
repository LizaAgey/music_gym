import {v1} from 'uuid';
import {ActionsType} from './redux_store';

export type PresetsPageType = {
    presets: Array<PresetGroupType>
    selectedPresetID: string
}
export type PresetElementType = {
    elementId: string
    elementValue: string
    elementSound: string
}
export type PresetGroupType = {
    presetId: string
    presetElements: Array<PresetElementType>
    presetName: string
}

export const SELECT_PRESET = 'SELECT_PRESET'
export const selectPresetAС = (presetId: string) => ({type: SELECT_PRESET, presetId: presetId} as const)

const initialState: PresetsPageType = {
    presets: [
        {
            presetId: v1(),
            presetElements: [
                {elementId: v1(), elementValue: 'cat_1', elementSound: './sounds/cat.wav'},
                {elementId: v1(), elementValue: 'dog_1', elementSound: './sounds/dog.wav'},
                {elementId: v1(), elementValue: 'frog_1', elementSound: './sounds/frog.wav'},
                {elementId: v1(), elementValue: 'sheep_1', elementSound: './sounds/sheep.mp3'},
            ],
            presetName: 'Preset 1'
        },
        {
            presetId: v1(),
            presetElements: [
                {elementId: v1(), elementValue: 'cat_2', elementSound: './sounds/cat.wav'},
                {elementId: v1(), elementValue: 'dog_2', elementSound: './sounds/dog.wav'},
                {elementId: v1(), elementValue: 'frog_2', elementSound: './sounds/frog.wav'},
                {elementId: v1(), elementValue: 'sheep_2', elementSound: './sounds/sheep.mp3'},
            ],
            presetName: 'Preset 2'
        }
    ],
    selectedPresetID: ""
}
const profileReducer = (state: PresetsPageType = initialState, action: ActionsType): PresetsPageType => {

    switch (action.type) {
        case SELECT_PRESET:
            console.log(state)
            return {...state, selectedPresetID: action.presetId}

        default:
            return state;
    }
};

export default profileReducer