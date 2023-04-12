import React, {useEffect, useState} from 'react';
import {RootState} from "../../../store/store";
import {useSelector} from "react-redux";
import {ENoteName} from '../../../store/types/musicEntities';
import {transformToMyChord} from "../../../utils/tonal";
import styles from './IntervalFunctionsModeInProgressPage.module.scss'
import classNames from "classnames";

export type MyChord = {
    name: string;
    key: string;
    notes: Array<Note>
}

export type Note = {
    name: string;
    interval: string;
    checked: boolean;
}


function IntervalFunctionsModeInProgressPage() {
    const {preset} = useSelector((state: RootState) => state);

    const [currentChord, setCurrentChord] = React.useState<MyChord>()
    const [currentExpectedNote, setCurrentExpectedNote] = React.useState<string>("")
    const [currentExpectedNoteIndex, setCurrentExpectedNoteIndex] = React.useState<number>(0)



    const [currentIndex, setCurrentIndex] = React.useState<number>(0)
    const [nextIndex, setNextIndex] = React.useState<number | undefined>(1)

    const [closestNoteName, setClosestNoteName] = useState('');

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 4096;
    analyser.smoothingTimeConstant = 0.8; // add some smoothing to reduce noise
    analyser.minDecibels = -55;
    analyser.maxDecibels = -10;
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);


    const midiNoteNumberToFrequency = (midiNoteNumber: number) =>
        440 * Math.pow(2, (midiNoteNumber - 69) / 12);

    const frequencyToMidiNoteNumber = (frequency: number) =>
        Math.round(12 * Math.log2(frequency / 440) + 69);

    // Compare expected note with input note
    useEffect(() => {
        if (currentChord) {
            if (closestNoteName === currentExpectedNote) {
                if ((currentExpectedNoteIndex + 1) % currentChord.notes.length === 0) { // All degress of chord checked next chord
                    const chord: MyChord | undefined = transformToMyChord(preset.rawElements![nextIndex!])
                    if (chord) {
                        setCurrentChord(chord);
                        setCurrentIndex(0);
                        setNextIndex((nextIndex! + 1) % preset.rawElements!.length);
                        setCurrentExpectedNote(chord.notes[0].name);
                        setCurrentExpectedNoteIndex(0);
                    }
                } else {

                    setCurrentChord(cc => {
                        cc!.notes[currentExpectedNoteIndex].checked = true;
                        return cc;
                    })
                    setCurrentExpectedNote(currentChord.notes[(currentExpectedNoteIndex + 1) % currentChord.notes.length].name);
                    setCurrentExpectedNoteIndex((currentExpectedNoteIndex + 1) % currentChord.notes.length);
                }
            }
        }
    }, [closestNoteName])

    useEffect(() => {
        if (preset.rawElements) {
            let myChord = transformToMyChord(preset.rawElements[currentIndex]);
            if (myChord) {
                setCurrentChord(myChord);
                // setNextIndex((currentIndex + 1) % currentChord.notes.length)
                setCurrentExpectedNote(myChord.notes[0].name)
            }
        }

        navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            audioContext.resume();
            setInterval(updateFrequencyData, 50);
        });
    }, []);


    const updateFrequencyData = () => {
        analyser.getByteFrequencyData(frequencyData);

        // @ts-ignore
        const maxFrequencyIndex = frequencyData.indexOf(Math.max(...frequencyData));
        const maxFrequency = maxFrequencyIndex * (audioContext.sampleRate / analyser.fftSize);

        const noteFrequencies = getNoteFrequencies();
        const closestNoteFrequency = noteFrequencies.reduce((prev, curr) => {
            return Math.abs(curr - maxFrequency) < Math.abs(prev - maxFrequency) ? curr : prev;
        });
        const closestMidiNoteNumber = frequencyToMidiNoteNumber(closestNoteFrequency);
        const closestNoteName = Object.values(ENoteName)[closestMidiNoteNumber % 12];

        function getNoteFrequencies() {
            const noteFrequencies = [];
            for (let i = 0; i < 128; i++) {
                noteFrequencies.push(440 * Math.pow(2, (i - 69) / 12));
            }
            return noteFrequencies;
        }

        setClosestNoteName(closestNoteName);
    };

    return (
        <>
            <div> INPUT NOTE = {closestNoteName}</div>

            <div className={styles.container}>
                <div className={styles.column}>

                </div>
                <div className={`${styles.column} ${styles.largeText}`}>
                    {currentChord?.name}
                </div>
                <div className={`${styles.column} ${styles.leftText}`}>
                    <p>
                        {preset.rawElements![nextIndex!]}
                    </p>
                </div>
            </div>
            <div className={styles.degreesContainer}>
                {
                    currentChord &&
                    <>
                        {currentChord.notes.map(n => {
                            return <div className={classNames(
                                styles.square,
                                n.checked ? styles.checked : "")}>{n.interval}</div>
                        })}
                    </>
                }
            </div>
            <div>
                {currentChord?.notes.map(n => {
                    return <div>{n.name}</div>
                })}
            </div>
        </>
    );
}

export default IntervalFunctionsModeInProgressPage;