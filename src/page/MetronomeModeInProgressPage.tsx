import React from 'react';
import {MainProgressView} from "../components/MainProgressView/MainProgressView";
import MainInProgressPage from "./MainInProgressPage";


function MetronomeModeInProgressPage() {
    return (
        <>
            <MainInProgressPage>
                <MainProgressView/>
            </MainInProgressPage>
        </>
    );
}

export default MetronomeModeInProgressPage;