import {AppStateType} from '../../../redux/redux_store';
import {PresetElementType, selectPresetAС} from '../../../redux/presetsReducer';
import {Dispatch} from 'redux';
import Presets from './Presets';
import {connect} from 'react-redux';

type MapStatePropsType = {
    state: Array<PresetElementType>
}

type MapDispatchPropsType = {
    selectPreset: () => void
}

export type PresetsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        state: state.presetsPage.animals
    };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        selectPreset: () => {
            dispatch(selectPresetAС())
        }}

};

const PresetsContainer = connect(mapStateToProps, mapDispatchToProps)(Presets)

export default PresetsContainer;