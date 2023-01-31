import {AppStateType} from '../../../redux/redux_store';
import {PresetGroupType, PresetsPageType, selectPresetAС, setPresetsAC} from '../../../redux/presetsReducer';
import {Dispatch} from 'redux';
import Presets from './Presets';
import {connect} from 'react-redux';

type MapStatePropsType = {
    state: PresetsPageType
}
type MapDispatchPropsType = {
    selectPreset: (presetId: string) => void
    setPresets: (presets: Array<PresetGroupType>) => void
}

export type PresetsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        state: state.presetsPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        selectPreset: (presetId: string) => {
            dispatch(selectPresetAС(presetId))
        },
        setPresets: (presets: Array<PresetGroupType>) => {
            dispatch(setPresetsAC(presets))
        }
    }

};

const PresetsContainer = connect(mapStateToProps, mapDispatchToProps)(Presets)
export default PresetsContainer;