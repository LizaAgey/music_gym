import React from 'react';
import {setup} from "../utils/audio/pitchDetection/pitchDetection";


const TestComponent1: React.FC = () => {

    React.useEffect(() => {
        setup();
    }, []);


    return (
        <div>
            <h1>Pitch Detection Example</h1>
            <p id='status'>Loading Model...</p>
            <p id='result'>No pitch detected</p>
        </div>
    );
};

export default TestComponent1;