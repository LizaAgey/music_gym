import React from 'react';

type ButtonType = {
    name: string
    onClick: ()=>void
}

const Button: React.FC<ButtonType> = (props) => {
    const onClickHandler = () => {
     props.onClick()
    };

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    );
};

export default Button;