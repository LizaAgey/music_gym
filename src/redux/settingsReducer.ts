import {ActionsType} from './redux_store';

export type SettingsPageType = {
    presetId: string
    trainingPeriod: number
    interval: number
    isInProgress: boolean
    isSoundOn: boolean
    isPaused: boolean
}

export const settingsInitialState: SettingsPageType = {
    presetId: '1',
    trainingPeriod: 5,
    interval: 3,
    isInProgress: false,
    isSoundOn: false,
    isPaused: false
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
            return {
                presetId: action.presetId,
                trainingPeriod: action.trainingPeriod,
                interval: action.interval,
                isInProgress: true,
                isSoundOn: action.isSoundOn,
                isPaused: false
            }
        case PAUSE:
            return {...state, isPaused: true}
        case PLAY:
            return {...state, isPaused: false}
        case SET_SETTINGS_PRESET_ID:
            return {...state, presetId: action.presetId}
        default:
            return state;
    }
};

export default settingsReducer