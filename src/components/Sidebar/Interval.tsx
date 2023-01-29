import React from 'react';
import Input from '../Input/Input';

const Interval: React.FC<any> = () => {
    return (
        <div>
            <p>Interval of displaying:</p>
            <Input type={"number"} value={0} setValue={()=>{}}/>
            <span>sec</span>
        </div>
    );
};

export default Interval;