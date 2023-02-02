import {Dispatch} from 'redux';
import {pauseAС, playAС, saveSettingsAС, setSettingsPresetIdAC, SettingsPageType} from '../redux/settingsReducer';
import {AppStateType} from '../redux/redux_store';
import {PresetsPageType} from "../redux/presetsReducer";


export type MapStateSettingsPropsType = {
    settings: SettingsPageType
    presets: PresetsPageType
}
export type MapDispatchSettingsPropsType = {
    saveSettings: (presetId: string, trainingPeriod: number, interval: number, isSoundOn: boolean) => void
    pause: () => void
    play: () => void
    setSettingsPresetId: (presetId: string) => void
}

export type SettingsType = MapStateSettingsPropsType & MapDispatchSettingsPropsType

export const mapStateSettingsToProps = (state: AppStateType): MapStateSettingsPropsType => {
    return {
        settings: state.settingsPage,
        presets: state.presetsPage
    }
}

export const mapDispatchSettingsToProps = (dispatch: Dispatch): MapDispatchSettingsPropsType => {
    return {
        saveSettings: (presetId: string, trainingPeriod: number, interval: number, isSoundOn: boolean) => {
            dispatch(saveSettingsAС(presetId, trainingPeriod, interval, isSoundOn))
        },
        pause: () => {
            dispatch(pauseAС())
        },
        play: () => {
            dispatch(playAС())
        },
        setSettingsPresetId: (presetId: string) => {
            dispatch(setSettingsPresetIdAC(presetId))
        }
    }

};