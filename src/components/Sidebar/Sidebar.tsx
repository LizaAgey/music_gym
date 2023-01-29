import React, {useState} from 'react';
import styles from './Sidebar.module.css'
import TimeCounter from './TimeCounter/TimeCounter';
import PresetsContainer from './Presets/PresetsContainer';
import Button from '../Button/Button';


const Sidebar: React.FC<any> = () => {
    const MIN_VALUE = 0
    const [period, setPeriod] = useState<number>(MIN_VALUE)
    const [interval, setInterval] = useState<number>(MIN_VALUE)
    const [soundMode, setSoundMode] = useState<boolean>(false)

    const soundModeHandler = () => {
        setSoundMode(!soundMode)
    };

    // const applySettings = () => {
    //     countDownTime(period, interval, soundMode, preset)
    // };
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarContent}>
                <h2>Music GYM</h2>
                <h3>Settings</h3>

                <PresetsContainer/>

                <TimeCounter title={'Training period:'} measures={'min'} value={period} setValue={setPeriod}
                             minValue={MIN_VALUE}/>
                <TimeCounter title={'Interval of displaying:'} measures={'sec'} value={interval} setValue={setInterval}
                             minValue={MIN_VALUE}/>

                <div>
                    <span>Sound</span>
                    <Button name={soundMode ? "on" : "off"} onClick={soundModeHandler}/>
                </div>

                <Button name={'Start'} onClick={()=>{}}></Button>
            </div>
        </div>
    );
};

export default Sidebar;