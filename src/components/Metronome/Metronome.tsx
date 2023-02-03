import React from "react";
import styles from './Metronome.module.css'
import classNames from "classnames";


// https://github.com/musicandcode/Metronome
export const Metronome: React.FC = (props) => {

    const [bpm, setBpm] = React.useState(140);

    const onIncreaseTempo = () => {
        if (bpm >= 280) {
            return
        };
        setBpm((prev) => prev + 1);
        console.log("onIncreaseTempo")
    };

    const onDecreaseTempo = () => {
        if (bpm <= 20) {
            return
        };
        setBpm((prev) => prev - 1);
        console.log("onDecreaseTempo")

    };

    const onSlider = (e: any) => {
        setBpm(Number(e.target.value));
    }

    return (
        <div className={styles.container}>
            <div className={styles.metronome}>
                <div className={styles.bpmDisplay}>
                    <span className={styles.tempo}>{bpm}</span>
                    <span className={styles.bpm}>BPM</span>
                </div>
                <div className={styles.tempoText}>Nice and steady</div>
                <div className={styles.tempoSettings}>
                    <div onClick={onDecreaseTempo}
                        className={classNames(styles.adjustTempoBtn, styles.decreaseTempo)}>-</div>
                    <input onInput={(e) => onSlider(e)} value={bpm} type="range" min="20" max="280" step="1" className={styles.slider}/>
                    <div
                        onClick={onIncreaseTempo}
                        className={classNames(styles.adjustTempoBtn, styles.increaseTempo)}>+</div>
                </div>
                <div className={styles.startStop}>START</div>
                <div className={styles.measures}>
                    <div className={classNames(styles.subtractBeats, styles.stepper)}>-</div>
                    <div className={styles.measureCount}>4</div>
                    <div className={classNames(styles.addBeats, styles.stepper)}>+</div>

                </div>
                <span className={styles.beatsPerMeasureText}>Beats per measure</span>

            </div>
        </div>
    )
}
