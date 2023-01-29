import React from 'react';
import styles from './Sidebar.module.css'
import TimeCounter from './TimeCounter/TimeCounter';
import PresetsContainer from './Presets/PresetsContainer';
import Button from '../Button/Button';

const Sidebar: React.FC<any> = () => {
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarContent}>
                <h2>Music GYM</h2>
                <h3>Settings</h3>

                <PresetsContainer/>

                <TimeCounter title={'Training period:'} measures={'min'}/>
                <TimeCounter title={'Interval of displaying:'} measures={'sec'}/>

                <div>
                    <span>Sound</span>
                    <Button name={'on'} onClick={() => {
                    }}/>
                </div>

                <Button name={'Start'} onClick={() => {
                }}></Button>
            </div>
        </div>
    );
};

export default Sidebar;