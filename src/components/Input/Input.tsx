import React, {ChangeEvent} from 'react';
import styles from './Input.module.css'

type InputType = {
    type: string
    value: string | number
    setValue: (value: string | number)=>void
}

const Input: React.FC<InputType> = (props) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
     props.setValue(event.currentTarget.value)
    };

    return (
        <input type={props.type} value={props.value} className={styles.inputElement}/>
    );
};

export default Input;