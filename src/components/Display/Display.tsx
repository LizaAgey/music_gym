import React, {useEffect, useState} from 'react';
import styles from './Display.module.css'
import {SettingsType} from '../SidebarDisplayContainersPropsCreator';
import {Statistic} from 'antd';
import {PresetElementType} from '../../data/presetsInitialData';

const {Countdown} = Statistic;

const Display: React.FC<SettingsType> = (props) => {
    const [displayValue, setDisplayValue] = useState('')
    const [inProgress, setInProgress] = React.useState<boolean>(false);

    const onFinish = () => {
        props.pause()
        props.setSettingsPresetId('')
    };

    const start = (): any => {
        // START
        const testArr: Array<PresetElementType> = props.state.presetsInitialData[0].presetElements
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * testArr.length);
            setDisplayValue(testArr[randomIndex].elementValue);
        }, props.state.interval * 1000);

        setTimeout(function () {
            clearInterval(interval);
        }, props.state.trainingPeriod * 60000);
    }

    return (
        <div className={styles.displayContainer}>
            <button onClick={() => {
                setInProgress(!inProgress);
                start();
            }}>
                start test
            </button>

            {inProgress
                ? <div>
                    <Countdown title="Training period"
                               value={Date.now() + props.state.trainingPeriod * 60000}
                               onFinish={onFinish}/>
                    <h1>{displayValue}</h1>
                </div>
                : ''}

            {props.state.presetId === ''
                ? <img src="./music_gym.png" alt="music" className={styles.logo}/>
                : <div className={styles.displayedValue}>
                    {displayValue}
                </div>}

        </div>
    );
};

export default Display;