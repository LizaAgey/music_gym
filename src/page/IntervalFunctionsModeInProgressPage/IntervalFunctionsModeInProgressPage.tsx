import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import MainInProgressPage from "../MainInProgressPage";
import {ENoteName, MyChord} from '../../store/types/musicEntities';
import {transformToMyChord} from "../../utils/tonal";
import styles from './IntervalFunctionsModeInProgressPage.module.scss'


function IntervalFunctionsModeInProgressPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {preset, progression} = useSelector((state: RootState) => state);

    const [progressionChords, setProgressionChords] = React.useState(preset.rawElements)
    const [currentChord, setCurrentChord] = React.useState<MyChord>()
    const [currentChordIndex, setCurrentChordIndex] = React.useState(0)

    const [closestNoteName, setClosestNoteName] = useState('');

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.minDecibels = -45;
    analyser.maxDecibels = -10;

    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    const midiNoteNumberToFrequency = (midiNoteNumber: number) =>
        440 * Math.pow(2, (midiNoteNumber - 69) / 12);

    const frequencyToMidiNoteNumber = (frequency: number) =>
        Math.round(12 * Math.log2(frequency / 440) + 69);

    useEffect(() => {
        if (progressionChords) {
            let myChord = transformToMyChord(progressionChords[currentChordIndex]);
            if (myChord) {
                setCurrentChord(myChord);
            }
        }
    }, [currentChordIndex])

    useEffect(() => {
        if (currentChord) {
            if (closestNoteName === currentChord.notes[0].name) {
                console.log("NOTE THE SAME")
                let nextIndex = currentChordIndex + 1;
                if (nextIndex === currentChord.notes.length - 1) {
                    nextIndex = 0;
                }
                setCurrentChordIndex(nextIndex);
            }
        }
    }, [closestNoteName])

    useEffect(() => {
        if (progressionChords) {
            let myChord = transformToMyChord(progressionChords[currentChordIndex]);
            if (myChord) {
                setCurrentChord(myChord);
            }
        }

        navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);

            audioContext.resume(); // Start the audio context

            setInterval(updateFrequencyData, 100);
        });
    }, []);

    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    const updateFrequencyData = () => {
        analyser.getByteFrequencyData(frequencyData);

        // @ts-ignore
        const maxFrequencyIndex = frequencyData.indexOf(Math.max(...frequencyData));
        const maxFrequency = maxFrequencyIndex * (audioContext.sampleRate / analyser.fftSize);
        const closestMidiNoteNumber = frequencyToMidiNoteNumber(maxFrequency);
        const closestNoteName = Object.values(ENoteName)[closestMidiNoteNumber % 12];
        setClosestNoteName(closestNoteName);
    };

    return (
        <>
            <MainInProgressPage>
                <div> noteName={closestNoteName}</div>
                <div>
                    {
                        currentChord && <>
                            CURRENT: {currentChord!.name}
                            NOTES: {currentChord!.notes.toString()}
                        </>
                    }


                </div>
                <div className={styles.elementContainer}>

                </div>
            </MainInProgressPage>
        </>
    );
}

export default IntervalFunctionsModeInProgressPage;