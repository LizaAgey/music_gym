import React, {useEffect, useState} from 'react';
import styles from './Display.module.css'
import {SettingsType} from '../SidebarDisplayContainersPropsCreator';
import {Statistic} from 'antd';
import {presetsInitialData} from '../../data/presetsInitialData';


const {Countdown} = Statistic;


const Display: React.FC<SettingsType> = (props) => {
    const [displayValue, setDisplayValue] = useState('')
    const deadline = Date.now() + props.state.trainingPeriod * 60000

    const onFinish = () => {
        props.pause()
        props.setSettingsPresetId('')
    };





    return (
        <div className={styles.displayContainer}>

            {props.state.isInProgress ? <Countdown title="Training period" value={deadline} onFinish={onFinish}/> : ''}

            {props.state.presetId === ''
                ? <img src="./music_gym.png" alt="music" className={styles.logo}/>
                : <div className={styles.displayedValue}>
                    {displayValue}
                </div>}

        </div>
    );
};

export default Display;