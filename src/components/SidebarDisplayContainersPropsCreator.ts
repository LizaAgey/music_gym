import {Dispatch} from 'redux';
import {pauseAС, playAС, saveSettingsAС, SettingsPageType} from '../redux/settingsReducer';
import {AppStateType} from '../redux/redux_store';


export type MapStateSettingsPropsType = {
    state: SettingsPageType
}
export type MapDispatchSettingsPropsType = {
    saveSettings: (presetId: string, trainingPeriod: number, interval: number, isSoundOn: boolean) => void
    pause: () => void
    play: () => void
}

export type SettingsType = MapStateSettingsPropsType & MapDispatchSettingsPropsType

export const mapStateSettingsToProps = (state: AppStateType): MapStateSettingsPropsType => {
    return {
        state: state.settingsPage
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
    }

};