import React, {useState} from 'react'
import Timer from "react-compound-timer";
import {Button} from "antd";
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {stopProgress, switchPause} from "../../store/slices/settings/slice";

// https://volkov97.github.io/react-compound-timer/

export const MyTimer: React.FC = () => {
    const dispatch = useAppDispatch();
    const settingsState = useSelector((state: RootState) => state.settings);


    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [nextIndex, setNextIndex] = useState<number>(0)
    const [id, setId] = useState<number>(0)

    let pauseMethod: Function;
    let resumeMethod: Function;

    let myInterval: number;
    React.useEffect(() => {
        myInterval = window.setInterval(() => {
            if (settingsState.isInProgress && !settingsState.isPaused) {
                setNextIndex((prevValue) => {
                    setCurrentIndex(prevValue);
                    return 2;
                });
            }
        }, 1000);
        setId(myInterval);
    }, [settingsState.isInProgress])

    document.addEventListener("keypress", (event) => {
        if (event.code === 'Space') {
            console.log("key event")
            // props.switchPause();
            if (settingsState.isPaused) {

            } else {
                pauseMethod();
            }
        }
    });

    const onStop = () => {
        window.clearInterval(id);
        dispatch(stopProgress());
    }

    return (
        <>
            {settingsState.isInProgress
                ? <div>
                    test
                    <Button type="default" onClick={() => onStop()}> STOP </Button>

                    <Timer
                        // initialTime={settingsState.trainingPeriod * 1000 * 60}
                        startImmediately={true}
                        direction={"backward"}
                        onStart={() => console.log("on start hook")}
                        onPause={() => dispatch(switchPause())}
                        onResume={() => dispatch(switchPause())}
                        onStop={() => {
                            onStop()
                        }}
                        checkpoints={[
                            {
                                time: 0,
                                callback: () => {
                                    onStop();
                                },
                            },
                        ]}
                    >
                        {/*@ts-ignore*/}
                        {({start, resume, pause, stop, reset, getTimerState, getTime}) => (
                            <React.Fragment>
                                {pauseMethod = pause}
                                {resumeMethod = resume}
                                <div>
                                    <Timer.Minutes/> minutes
                                    <Timer.Seconds/> seconds
                                </div>
                                <div>{getTimerState()}</div>
                                <br/>
                                <div>
                                    <button onClick={start}>Start</button>
                                    <button onClick={pause}>Pause</button>
                                    <button onClick={resume}>Resume</button>
                                    <button onClick={stop}>Stop</button>
                                    <button onClick={reset}>Reset</button>
                                </div>
                            </React.Fragment>
                        )}
                    </Timer>
                    {settingsState.isInProgress && !settingsState.isPaused
                        &&
                        // <h1>{settingsState.presetElementsToDisplay[currentIndex].elementValue} - {settingsState.presetElementsToDisplay[nextIndex].elementValue}</h1>}
                        <h1>test</h1>}

                </div> : null
            }
        </>
    );
}

