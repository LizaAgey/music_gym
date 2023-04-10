import React from 'react';
import {Button, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../store/store";
import {stopProgress, switchPause} from "../store/slices/settings/slice";
import {PauseCircleTwoTone} from "@mui/icons-material";
import {useSelector} from "react-redux";
import Timer from "react-compound-timer";
import VantaBackground from "./VantaBackground";

interface MetronomeInProgressProps {
    children: React.ReactNode;
}

const MainInProgressPage: React.FC<MetronomeInProgressProps> = ({children}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const settingsState = useSelector((state: RootState) => state.settings);

    let pauseTimer: Function;
    let resumeTimer: Function;

    const onStopHandler = () => {
        dispatch(stopProgress());
        navigate('/');
    }

    const handler = (e: KeyboardEvent) => {
        if (e.keyCode === 32) { // SPACE
            e.stopPropagation();
            e.preventDefault();
            dispatch(switchPause());
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handler, false);
        return () => window.removeEventListener('keydown', handler, false);
    }, []);

    React.useEffect(() => {
        if (settingsState.isPaused) {
            pauseTimer();
        } else {
            resumeTimer();
        }
    }, [settingsState.isPaused]);

    return (
        <>
            <VantaBackground>
                <div>
                    <Row>
                        <Button onClick={onStopHandler} danger>STOP</Button>
                        {settingsState.isPaused && <PauseCircleTwoTone/>}

                        <Timer initialTime={0}
                               startImmediately={true}
                               direction={"forward"}>
                            {/*@ts-ignore*/}
                            {({resume, pause}) => (
                                <React.Fragment>
                                    {pauseTimer = pause}
                                    {resumeTimer = resume}
                                    <div>
                                        <Timer.Minutes/> m
                                        <Timer.Seconds/> s
                                    </div>
                                    <br/>
                                </React.Fragment>
                            )}
                        </Timer>

                    </Row>
                    <br/>
                    <div>
                        {children}
                    </div>

                </div>
            </VantaBackground>
        </>
    );
}

export default MainInProgressPage;