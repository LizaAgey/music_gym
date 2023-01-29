import React, {useState} from 'react';
import Input from '../../Input/Input';
import styles from './TimeCounter.module.css'

type TimeCounterType = {
    title: string
    measures: 'sec' | 'min'
}

const TimeCounter: React.FC<TimeCounterType> = (props) => {
    const MIN_VALUE = 0
    const [value, setValue] = useState<number>(MIN_VALUE)

    const onChangeHandler = (value: number | string) => {
        if (typeof value === 'number') {
            value >= MIN_VALUE
                ? setValue(value)
                : setValue(MIN_VALUE)
        }
    };
    return (
        <div>
            <p>{props.title}</p>
            <div className={styles.timeInput}>
                <Input
                    type={'number'}
                    value={value}
                    setValue={(value) => onChangeHandler(value)}
                />
                <p>{props.measures}</p>
            </div>
        </div>
    );
};

export default TimeCounter;