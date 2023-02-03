import React, {useState} from 'react'
import Timer from "react-compound-timer";
import {SettingsType} from "../ContainersPropsCreator";
import {Button} from "antd";
import {Metronome} from "../Metronome/Metronome";

// https://volkov97.github.io/react-compound-timer/

export const MyTimer: React.FC<SettingsType> = (props) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [nextIndex, setNextIndex] = useState<number>(0)
    const [id, setId] = useState<number>(0)

    let pauseMethod: Function;
    let resumeMethod: Function;

    let myInterval: number;
    React.useEffect(() => {
        console.log("use effect");
        myInterval = window.setInterval(() => {
            if (props.state.isInProgress && !props.state.isPaused) {
                setNextIndex((prevValue) => {
                    setCurrentIndex(prevValue);
                    return Math.floor(Math.random() * props.state.presetElementsToDisplay.length)
                });
            }
        }, props.state.interval * 1000);
        console.log("interva", myInterval);
        setId(myInterval);
    }, [props.state.isInProgress, props.state.interval])

    document.addEventListener("keypress", (event) => {
        if (event.code === 'Space') {
            console.log("key event")
            props.switchPause();
            if (props.state.isPaused) {

            } else {
                pauseMethod();
            }
        }
    });

    const onStop = () => {
        window.clearInterval(id);
        props.stop();
    }

    return (
        <>
            {props.state.isInProgress
                ? <div>
                    test
                    <Button type="default" onClick={() => onStop()}> STOP </Button>

                    <Timer
                        initialTime={props.state.trainingPeriod * 1000 * 60}
                        startImmediately={true}
                        direction={"backward"}
                        onStart={() => console.log("on start hook")}
                        onPause={() => props.switchPause()}
                        onResume={() => props.switchPause()}
                        onStop={() => {onStop()}}
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
                    {props.state.isInProgress && !props.state.isPaused
                        &&
                        <h1>{props.state.presetElementsToDisplay[currentIndex].elementValue} - {props.state.presetElementsToDisplay[nextIndex].elementValue}</h1>}

                </div> : null
            }
        </>
    );
}

