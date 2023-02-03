import {connect} from 'react-redux';
import {mapDispatchSettingsToProps, mapStateSettingsToProps} from '../ContainersPropsCreator';
import {Display} from './Display';

const DisplayContainer = connect(mapStateSettingsToProps, mapDispatchSettingsToProps)(Display)
export default DisplayContainer

