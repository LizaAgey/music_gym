import React, {useState} from 'react';
import Input from '../../Input/Input';
import styles from './TimeCounter.module.css'

type TimeCounterType = {
    title: string
    measures: 'sec' | 'min'
    value: number
    setValue: (value: number)=>void
    minValue: number
}

const TimeCounter: React.FC<TimeCounterType> = (props) => {

    const onChangeHandler = (value: number | string) => {
        if (typeof value === 'number') {
            value >= props.minValue
                ? props.setValue(value)
                : props.setValue(props.minValue)
        }
    };
    return (
        <div>
            <p>{props.title}</p>
            <div className={styles.timeInput}>
                <Input
                    type={'number'}
                    value={props.value}
                    setValue={(value) => onChangeHandler(value)}
                />
                <p>{props.measures}</p>
            </div>
        </div>
    );
};

export default TimeCounter;