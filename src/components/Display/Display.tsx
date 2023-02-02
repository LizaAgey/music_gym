import React, {useEffect, useState} from 'react';
import styles from './Display.module.css'
import {SettingsType} from '../SidebarDisplayContainersPropsCreator';
import {Statistic} from 'antd';
import {presetsInitialData} from '../../data/presetsInitialData';
import {PresetElementType, PresetGroupType} from "../../redux/presetsReducer";


const {Countdown} = Statistic;


const Display: React.FC<SettingsType> = (props) => {
    const [displayValue, setDisplayValue] = useState('')
    const deadline = Date.now() + props.settings.trainingPeriod * 60000

    const [inProgress, setInProgress] = React.useState<boolean>(false);

    const onFinish = () => {
        props.pause()
        props.setSettingsPresetId('')
    };

    const start = (): any => {
        // START
        const testArr: Array<PresetElementType> = props.presets.presets[0].presetElements
        setTimeout(function () {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * testArr.length);
                setDisplayValue(testArr[randomIndex].elementValue);
            }, props.settings.interval * 1000);

            setTimeout(function () {
                clearInterval(interval);
            }, props.settings.trainingPeriod * 60000);
        }, 3000);
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
                    <Countdown title="Training period" value={deadline} onFinish={onFinish}/>
                    <h1>{displayValue}</h1>
                </div>
                : ''}

            {props.settings.presetId === ''
                ? <img src="./music_gym.png" alt="music" className={styles.logo}/>
                : <div className={styles.displayedValue}>
                    {displayValue}
                </div>}

        </div>
    );
};

export default Display;