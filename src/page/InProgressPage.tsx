import React from 'react';
import {Button} from "antd";
import {MyTimerNew} from "../components/Timer/MyTimerNew";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../store/store";
import {stopProgress} from "../store/slices/settings/slice";


function InProgressPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onStopHandler = () => {
        dispatch(stopProgress());
        navigate('/');
    }

    return (
        <>
            <div>
                <Button onClick={onStopHandler} danger>STOP</Button>
                <br/>
                <MyTimerNew/>
            </div>
        </>
    );
}

export default InProgressPage;