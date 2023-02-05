import React, {useState} from 'react'
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {stopProgress} from "../../store/slices/settings/slice";
import styles from './MyTimerNew.module.css'


// https://volkov97.github.io/react-compound-timer/

export const MyTimerNew: React.FC = () => {
    const dispatch = useAppDispatch();
    const settingsState = useSelector((state: RootState) => state.settings);

    const click1: HTMLMediaElement = new Audio('./sounds/metronome/click1.mp3');
    const click2: HTMLMediaElement = new Audio('./sounds/metronome/click2.mp3');

    let [count, setCount] = React.useState<number>(0);

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [nextIndex, setNextIndex] = useState<number>(0)
    const [myTimeout, setMyTimeout] = useState<NodeJS.Timeout>()

    const doWork = () => {
        console.log(currentIndex, nextIndex);
        setCount(c => {
            let innerCount = c;
            if (innerCount === settingsState.beats) {
                innerCount = 0;
            }
            if (innerCount === 0) {
                settingsState.isSoundOn && click2.play();
                click2.currentTime = 0;
                // Show new element on strong beat
                setNextIndex((prevValue) => {
                    setCurrentIndex(prevValue);
                    return Math.floor(Math.random() * settingsState.preset.elements.length);
                });
            } else {
                settingsState.isSoundOn && click1.play();
                click1.currentTime = 0;
            }
            return innerCount + 1;
        });
    }

    const startThread = () => {
        let timeInterval = 60000 / settingsState.bpm;
        let expected = Date.now() + timeInterval;

        let round = () => {
            let drift = Date.now() - expected;
            doWork();
            expected += timeInterval;
            setMyTimeout(setTimeout(round, timeInterval - drift));
        }
        doWork();
        setMyTimeout(setTimeout(round, timeInterval));
    }

    React.useEffect(() => {
        if (settingsState.isInProgress) {
            startThread();
        } else {
            window.clearTimeout(myTimeout);
            setCount(0);
            dispatch(stopProgress());
        }
    }, [settingsState.isInProgress]);

    return (
        <>
            {settingsState.isInProgress
                ? <div className={styles.displayContainer}>
                    CURRENT - {settingsState.preset?.elements[currentIndex].value}
                    <br/>
                    NEXT - {settingsState.preset?.elements[nextIndex].value}
                </div> : null
            }
        </>
    );
}
