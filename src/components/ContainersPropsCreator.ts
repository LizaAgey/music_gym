import {Dispatch} from 'redux';
import {
    switchPauseAС,
    playAС,
    saveSettingsAС,
    setPresetsDataToStoreAC,
    setSettingsPresetIdAC,
    SettingsPageType, stopAС
} from '../redux/settingsReducer';
import {AppStateType} from '../redux/redux_store';
import {PresetsInitialDataType} from '../data/presetsInitialData';

export type MapStateSettingsPropsType = {
    state: SettingsPageType

}
export type MapDispatchSettingsPropsType = {
    saveSettings: (trainingPeriod: number, interval: number, isSoundOn: boolean) => void
    switchPause: () => void
    stop: () => void
    start: () => void
    setSettingsPresetId: (presetId: string) => void
    setPresetsDataToStore: (presetsData: PresetsInitialDataType) => void
    // setTrainingPeriod: (trainingPeriod: number) => void
    // setInterval: (interval:number) => void
    // setSoundMode: (soundMode:boolean) => void
}


export type SettingsType = MapStateSettingsPropsType & MapDispatchSettingsPropsType

export const mapStateSettingsToProps = (state: AppStateType): MapStateSettingsPropsType => {
    return {
        state: state.settingsPage,
    }
}

export const mapDispatchSettingsToProps = (dispatch: Dispatch): MapDispatchSettingsPropsType => {
    return {
        saveSettings: (trainingPeriod: number, interval: number, isSoundOn: boolean) => {
            dispatch(saveSettingsAС(trainingPeriod, interval, isSoundOn))
        },
        switchPause: () => {
            dispatch(switchPauseAС())
        },
        stop: () => {
            dispatch(stopAС())
        },
        start: () => {
            dispatch(playAС())
        },
        setSettingsPresetId: (presetId: string) => {
            dispatch(setSettingsPresetIdAC(presetId))
        },
        setPresetsDataToStore: (presetsData: PresetsInitialDataType) => {
            dispatch(setPresetsDataToStoreAC(presetsData))
        },
        // setTrainingPeriod: (trainingPeriod:number) => {
        //     dispatch(setTrainingPeriodAC(trainingPeriod))
        // },
        // setInterval: (interval:number) => {
        //     dispatch(setIntervalAC(interval))
        // },
        // setSoundMode: (soundMode:boolean) => {
        //     dispatch(setSoundModeAC(soundMode))
        // }
    }

};