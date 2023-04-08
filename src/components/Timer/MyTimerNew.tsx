import React, {useState} from 'react'
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {stopProgress} from "../../store/slices/settings/slice";
import styles from './MyTimerNew.module.scss'
import {PresetType} from "../../store/slices/preset/types";
import {selectPresetsWithPresetId} from "../../store/slices/preset/selectors";


// https://volkov97.github.io/react-compound-timer/

export const MyTimerNew: React.FC = () => {
    const dispatch = useAppDispatch();
    const {preset, settings, metronome} = useSelector((state: RootState) => state);

    const click1: HTMLMediaElement = new Audio('./sounds/metronome/click1.mp3');
    const click2: HTMLMediaElement = new Audio('./sounds/metronome/click2.mp3');
    // const click2: HTMLMediaElement = new Audio('./sounds/notes/C_stretched.wav');

    let [count, setCount] = React.useState<number>(0);
    let [isPaused, setIsPaused] = React.useState<boolean>(false);

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [nextIndex, setNextIndex] = useState<number>(0)
    const [myTimeout, setMyTimeout] = useState<NodeJS.Timeout>()

    const doWork = () => {
        setIsPaused(isPaused => {
            if (!isPaused) {
                setCount(c => {
                    let innerCount = c;

                    if (innerCount === metronome.beatsPerMeasure) {
                        innerCount = 0;
                    }
                    if (innerCount === 0) {
                        settings.isSoundOn && click2.play();
                        click2.currentTime = 0;
                        // Show new element on strong beat
                        setNextIndex((prevValue) => {
                            if (settings.isRandom) {
                                setCurrentIndex(prevValue);
                                const presetsWithPresetId: PresetType = preset.currentPreset;

                                let nextIndex: number = Math.floor(Math.random() * presetsWithPresetId.elements.length);
                                if (nextIndex === prevValue) {
                                    nextIndex = Math.floor(Math.random() * presetsWithPresetId.elements.length);
                                }
                                return nextIndex
                            } else {
                                setCurrentIndex(prevValue);
                                if (prevValue === preset.rawElements!.length - 1) {
                                    return 0;
                                } else {
                                    return prevValue + 1;
                                }
                            }
                        });
                    } else {
                        settings.isSoundOn && click1.play();
                        click1.currentTime = 0;
                    }
                    return innerCount + 1;
                });
            }
            return isPaused;
        })

    }

    const startThread = () => {
        let timeInterval = 60000 / metronome.bpm;
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
        if (settings.isInProgress) {
            startThread();
        } else {
            window.clearTimeout(myTimeout);
            setCount(0);
            dispatch(stopProgress());
        }
    }, [settings.isInProgress]);

    React.useEffect(() => {
        setIsPaused(settings.isPaused);
    }, [settings.isPaused]);

    return (
        <>
            {settings.isInProgress
                ? <div className={styles.displayContainer}>
                    <div className={styles.current}>
                        <div className={styles.note}>
                            {preset.rawElements?.[currentIndex]}
                        </div>
                    </div>
                    {settings.isShowNext &&
                        <div className={styles.next}>
                            <div className={styles.note}>
                                {preset.rawElements?.[nextIndex]}
                            </div>
                        </div>}
                </div>
                : null}

        </>
    );
}

