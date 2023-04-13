import React from 'react';
import {Button, Row} from "antd";
import {Outlet, useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../../store/store";
import {stopProgress, switchPause} from "../../store/slices/training/main/slice";
import {PauseCircleTwoTone} from "@mui/icons-material";
import {useSelector} from "react-redux";
import Timer from "react-compound-timer";
import VantaBackground from "./VantaBackground";

const MainInProgressPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { mainTraining } = useSelector((state: RootState) => state);

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
        if (mainTraining.isPaused) {
            pauseTimer();
        } else {
            resumeTimer();
        }
    }, [mainTraining.isPaused]);

    return (
        <>
            <VantaBackground>
                <div>
                    <Row>
                        <Button onClick={onStopHandler} danger>STOP</Button>
                        {mainTraining.isPaused && <PauseCircleTwoTone/>}

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
                        <Outlet/>
                    </div>

                </div>
            </VantaBackground>
        </>
    );
}

export default MainInProgressPage;