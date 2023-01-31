import {AppStateType} from '../../../redux/redux_store';
import {PresetGroupType, PresetsPageType, selectPresetAС, setPresetsAC} from '../../../redux/presetsReducer';
import {Dispatch} from 'redux';
import Presets from './Presets';
import {connect} from 'react-redux';
import {setSettingsPresetIdAC} from '../../../redux/settingsReducer';

type MapStatePropsType = {
    state: PresetsPageType
    settingsPresetId: string
}
type MapDispatchPropsType = {
    selectPreset: (presetId: string) => void
    setPresets: (presets: Array<PresetGroupType>) => void
    setSettingsPresetID: (presetId: string)=> void
}

export type PresetsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        state: state.presetsPage,
        settingsPresetId: state.settingsPage.presetId
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        selectPreset: (presetId: string) => {
            dispatch(selectPresetAС(presetId))
        },
        setPresets: (presets: Array<PresetGroupType>) => {
            dispatch(setPresetsAC(presets))
        },
        setSettingsPresetID: (presetId: string) => {
            dispatch(setSettingsPresetIdAC(presetId))
        }
    }

};

const PresetsContainer = connect(mapStateToProps, mapDispatchToProps)(Presets)
export default PresetsContainer;