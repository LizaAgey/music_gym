import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import styles from './IntervalFunctionsModeInProgressPage.module.scss'
import classNames from "classnames";
import {analyser, audioContext, updateFrequencyData} from '../../../utils/audio/audioUtils';
import {setNoteAnalyser, setRawElements} from "../../../store/slices/training/interval/slice";
import {selectNextChordString} from "../../../store/slices/training/interval/selector";

function IntervalFunctionsModeInProgressPage() {
    const {preset, intervalTraining} = useSelector((state: RootState) => state);
    const dispatch = useAppDispatch();

    const nextChord = useSelector((state: RootState) => selectNextChordString(state));

    useEffect(() => {
        dispatch(setRawElements(preset.rawElements!));
        initAudioAnalyser();
    }, []);

    function initAudioAnalyser() {
        navigator.mediaDevices.getUserMedia({audio: true, video: false}).then((stream) => {
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            audioContext.resume();
            setInterval(() => {
                // setNoteAnalyser(updateFrequencyData());
                dispatch(setNoteAnalyser(updateFrequencyData()));
            }, 10);
        });
    }

    return (
        <>
            <div style={{fontSize: "20px"}}>
                <p>
                    INPUT NOTE = {intervalTraining.noteAnalyser.closestNoteName}
                </p>
                <p>
                    closestNoteFrequency = {intervalTraining.noteAnalyser.closestNoteFrequency}
                </p>
                <p>
                    closestMidiNoteNumber = {intervalTraining.noteAnalyser.closestMidiNoteNumber}
                </p>
            </div>

            <div className={styles.container}>
                <div className={styles.column}>

                </div>
                <div className={`${styles.column} ${styles.largeText}`}>
                    {intervalTraining.currentChord.name}
                </div>
                <div className={`${styles.column} ${styles.leftText}`}>
                    <p>
                        {nextChord}
                    </p>
                </div>
            </div>
            <div className={styles.degreesContainer}>
                {intervalTraining.currentChord.notes.map(n => {
                    return <div className={classNames(styles.square, {[styles.checked]: n.checked})}>
                        {n.interval}
                    </div>
                })}
            </div>
            <div>
                {intervalTraining.currentChord.notes.map(n => {
                    return <div>{n.name}</div>
                })}
            </div>
        </>
    );
}

export default IntervalFunctionsModeInProgressPage;