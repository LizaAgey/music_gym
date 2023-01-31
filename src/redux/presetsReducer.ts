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
export const SET_PRESETS = 'SET_PRESET'
export const selectPresetAС = (presetId: string) => ({type: SELECT_PRESET, presetId: presetId} as const)
export const setPresetsAC = (presets: Array<PresetGroupType>) => ({type: SET_PRESETS, presets} as const)

const initialState: PresetsPageType = {
    presets: [],
    selectedPresetID: ""
}
const profileReducer = (state: PresetsPageType = initialState, action: ActionsType): PresetsPageType => {

    switch (action.type) {
        case SELECT_PRESET:
            return {...state, selectedPresetID: action.presetId}
        case SET_PRESETS:
            return {...state, presets: [...state.presets, ...action.presets]}
        default:
            return state;
    }
};

export default profileReducer