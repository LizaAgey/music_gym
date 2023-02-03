import React, {useState} from 'react';
import styles from './Display.module.css'
import {SettingsType} from '../ContainersPropsCreator';
import {Statistic} from 'antd';
import {PresetElementType} from '../../data/presetsInitialData';

const {Countdown} = Statistic;

export const Display: React.FC<SettingsType> = (props) => {
    console.log('display rerendered')

    const onFinish = () => props.pause()

    const DisplayElement = (props: { elementsToDisplay: Array<PresetElementType>, interval: number, trainingPeriod: number }) => {

        const [displayValue, setDisplayValue] = useState('')
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * props.elementsToDisplay.length);
            setDisplayValue(props.elementsToDisplay[randomIndex].elementValue);
        }, props.interval * 1000);

        setTimeout(function () {
            clearInterval(interval);
        }, props.trainingPeriod * 60000);


        return <div>{displayValue}</div>
    }
    const DisplayElementContainer = React.memo(DisplayElement)


    return (
        <div className={styles.displayContainer}>
            {props.state.isInProgress
                ? <div>
                    <Countdown title="Training period"
                               value={Date.now() + props.state.trainingPeriod * 60000}
                               onFinish={onFinish}/>

                    <DisplayElementContainer
                        elementsToDisplay={props.state.presetElementsToDisplay}
                        interval={props.state.interval}
                        trainingPeriod={props.state.trainingPeriod}

                    />
                    {/*<h1>{displayValue}</h1>*/}
                </div>
                : <img src="./music_gym.png" alt="music" className={styles.logo}/>}

        </div>
    );
};