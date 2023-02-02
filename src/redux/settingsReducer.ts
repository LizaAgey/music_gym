import {ActionsType} from './redux_store';
import {presetsInitialData} from '../data/presetsInitialData';
import {PresetElementType} from './presetsReducer';

export type SettingsPageType = {
    presetId: string
    trainingPeriod: number
    interval: number
    isInProgress: boolean
    isSoundOn: boolean
    isPaused: boolean
    presetsToDisplay: Array<PresetElementType>
}

export const settingsInitialState: SettingsPageType = {
    presetId: '',
    trainingPeriod: 3,
    interval: 2,
    isInProgress: false,
    isSoundOn: false,
    isPaused: false,
    presetsToDisplay: []
}

export const SAVE_SETTINGS = 'SAVE_SETTINGS'
export const PAUSE = 'PAUSE'
export const PLAY = 'PLAY'
export const SET_SETTINGS_PRESET_ID = 'SET_SETTINGS_PRESET_ID'


export const saveSettingsAС = (presetId: string, trainingPeriod: number, interval: number, isSoundOn: boolean) => (
    {type: SAVE_SETTINGS, presetId, trainingPeriod, interval, isSoundOn} as const)
export const pauseAС = () => ({type: PAUSE} as const)
export const playAС = () => ({type: PLAY} as const)
export const setSettingsPresetIdAC = (presetId: string) => ({type: SET_SETTINGS_PRESET_ID, presetId} as const)

const settingsReducer = (state: SettingsPageType = settingsInitialState, action: ActionsType): SettingsPageType => {

    switch (action.type) {
        case SAVE_SETTINGS:
            let presetElementsToDisplay: Array<PresetElementType> = presetsInitialData.filter((presetGroup) => presetGroup.presetId === action.presetId)[0].presetElements

            return {
                presetId: action.presetId,
                trainingPeriod: action.trainingPeriod,
                interval: action.interval,
                isInProgress: true,
                isSoundOn: action.isSoundOn,
                isPaused: false,
                presetsToDisplay: presetElementsToDisplay
            }
        case PAUSE:
            return {...state, isPaused: true, isInProgress: false}
        case PLAY:
            return {...state, isPaused: false, isInProgress: true}
        case SET_SETTINGS_PRESET_ID:
            return {...state, presetId: action.presetId}
        default:
            return state;
    }
};

export default settingsReducer