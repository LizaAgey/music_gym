import React from 'react';
import styles from "./Display.module.css"

const Display: React.FC<any> = () => {
    return (
        <div className={styles.displayContainer}>
           <p className={styles.displayedValue}>K</p>
        </div>
    );
};

export default Display;