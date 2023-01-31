import {connect} from 'react-redux';
import {mapDispatchSettingsToProps, mapStateSettingsToProps} from '../SidebarDisplayContainersPropsCreator';
import Sidebar from './Sidebar';

const SidebarContainer = connect(mapStateSettingsToProps, mapDispatchSettingsToProps)(Sidebar)
export default SidebarContainer