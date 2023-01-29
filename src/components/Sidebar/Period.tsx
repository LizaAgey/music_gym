import React from 'react';
import Input from '../Input/Input';

const Period: React.FC<any> = () => {
    return (
        <div>
            <p>Training period:</p>
            <Input type={"number"} value={0} setValue={()=>{}}/>
            <span>min</span>
        </div>
    );
};

export default Period;