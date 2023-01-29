import React, {ChangeEvent} from 'react';
import styles from './Input.module.css'

type InputType = {
    type: "number" | "text"
    value: string | number
    setValue: (value: string | number) => void
}

const Input: React.FC<InputType> = (props) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setValue(Number(event.currentTarget.value))
    };

    return (
        <input
            type={props.type}
            value={props.value}
            className={props.type === "number" ? styles.inputNumber : styles.inputText}
            onChange={(event) => onChangeHandler(event)}
        />
    );
};

export default Input;