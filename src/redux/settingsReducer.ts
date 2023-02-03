import {ActionsType} from './redux_store';
import {PresetElementType, presetsInitialData, PresetsInitialDataType} from '../data/presetsInitialData';

export type SettingsPageType = {
    presetId: string
    trainingPeriod: number
    interval: number
    isInProgress: boolean
    isSoundOn: boolean
    isPaused: boolean
    presetElementsToDisplay: Array<PresetElementType>
    presetsInitialData: PresetsInitialDataType
}

export const settingsInitialState: SettingsPageType = {
    presetId: '',
    trainingPeriod: 3,
    interval: 2,
    isInProgress: false,
    isSoundOn: false,
    isPaused: false,
    presetElementsToDisplay: [],
    presetsInitialData: []
}

export const SAVE_SETTINGS = 'SAVE_SETTINGS'
export const SWITCH_PAUSE = 'SWITCH_PAUSE'
export const STOP = 'STOP'
export const PLAY = 'PLAY'
export const SET_SETTINGS_PRESET_ID = 'SET_SETTINGS_PRESET_ID'
export const SET_PRESETS = 'SET_PRESETS_DATA_TO_STORE'
// export const SET_TRAINING_PERIOD = 'SET_TRAINING_PERIOD'
// export const SET_INTERVAL = 'SET_INTERVAL'
// export const SET_SOUND_MODE = 'SET_SOUND_MODE'


export const saveSettingsAС = (trainingPeriod: number, interval: number, isSoundOn: boolean) => (
    {type: SAVE_SETTINGS, trainingPeriod, interval, isSoundOn} as const)
export const switchPauseAС = () => ({type: SWITCH_PAUSE} as const)
export const stopAС = () => ({type: STOP} as const)
export const playAС = () => ({type: PLAY} as const)
export const setSettingsPresetIdAC = (presetId: string) => ({type: SET_SETTINGS_PRESET_ID, presetId} as const)
export const setPresetsDataToStoreAC = (presetsData: PresetsInitialDataType) => ({
    type: SET_PRESETS,
    presetsData
} as const)
// export const setTrainingPeriodAC = (trainingPeriod: number) => ({type: SET_TRAINING_PERIOD, trainingPeriod} as const)
// export const setIntervalAC = (interval: number) => ({type: SET_INTERVAL, interval} as const)
// export const setSoundModeAC = (soundMode: boolean) => ({type: SET_SOUND_MODE, soundMode} as const)

const settingsReducer = (state: SettingsPageType = settingsInitialState, action: ActionsType): SettingsPageType => {

    switch (action.type) {
        case SAVE_SETTINGS:
            let presetElementsToDisplay: Array<PresetElementType> = presetsInitialData.filter((presetGroup) => presetGroup.presetId === state.presetId)[0].presetElements

            return {
                ...state,
                trainingPeriod: action.trainingPeriod,
                interval: action.interval,
                isInProgress: true,
                isSoundOn: action.isSoundOn,
                isPaused: false,
                presetElementsToDisplay: presetElementsToDisplay,
            }
        case SWITCH_PAUSE:
            return {...state, isPaused: !state.isPaused, isInProgress: true}
        case STOP:
            return {...state, isPaused: false, isInProgress: false}
        case PLAY:
            return {...state, isPaused: false, isInProgress: true}
        case SET_SETTINGS_PRESET_ID:
            return {...state, presetId: action.presetId}
        case SET_PRESETS:
            return {...state, presetsInitialData: action.presetsData}
        // case SET_TRAINING_PERIOD:
        //     return {...state, trainingPeriod: action.trainingPeriod}
        // case SET_INTERVAL:
        //     return {...state, interval: action.interval}
        // case SET_SOUND_MODE:
        //     return {...state, isSoundOn: action.soundMode}
        default:
            return state;
    }
};

export default settingsReducer