import {connect} from 'react-redux';
import {mapDispatchSettingsToProps, mapStateSettingsToProps} from '../ContainersPropsCreator';
import {MyTimer} from "./MyTimer";

const MyTimerContainer = connect(mapStateSettingsToProps, mapDispatchSettingsToProps)(MyTimer)
export default MyTimerContainer