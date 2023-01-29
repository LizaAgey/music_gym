import React from 'react';
import styles from './Sidebar.module.css'
import Period from './Period';
import Interval from './Interval';
import PresetsContainer from './Presets/PresetsContainer';

const Sidebar: React.FC<any> = () => {
    return (
        <div className={styles.sidebarContainer}>
            <PresetsContainer/>
            <Period/>
            <Interval/>
        </div>
    );
};

export default Sidebar;