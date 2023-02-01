import React, {useState} from 'react';
import styles from './Sidebar.module.css'
import TimeCounter from './TimeCounter/TimeCounter';
import PresetsContainer from './Presets/PresetsContainer';
import Button from '../Button/Button';
import {SettingsType} from '../SidebarDisplayContainersPropsCreator';


const Sidebar: React.FC<SettingsType> = (props) => {
    const MIN_VALUE = 0
    const [trainingPeriod, setTrainingPeriod] = useState<number>(props.state.trainingPeriod)
    const [interval, setInterval] = useState<number>(props.state.interval)
    const [soundMode, setSoundMode] = useState<boolean>(props.state.isSoundOn)
    const presetId = props.state.presetId

    const soundModeHandler = () => {
        setSoundMode(!soundMode)
    };

    const saveSettingsHandler = () => {
     props.saveSettings(presetId, trainingPeriod, interval, soundMode)
    };

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarContent}>
                <h2>Music GYM</h2>
                <h3>Settings</h3>

                <PresetsContainer/>

                <TimeCounter title={'Training period:'} measures={'min'} value={trainingPeriod} setValue={setTrainingPeriod}
                             minValue={MIN_VALUE}/>
                <TimeCounter title={'Interval of displaying:'} measures={'sec'} value={interval} setValue={setInterval}
                             minValue={MIN_VALUE}/>

                <div>
                    <span>Sound</span>
                    <Button name={soundMode ? "on" : "off"} onClick={soundModeHandler}/>
                </div>

                <Button name={'Start'} onClick={saveSettingsHandler}></Button>
            </div>
        </div>
    );
};

export default Sidebar;