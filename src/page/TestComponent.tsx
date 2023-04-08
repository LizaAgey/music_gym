import React, { useState, useEffect } from 'react';

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const midiNoteNumberToFrequency = (midiNoteNumber: number) =>
    440 * Math.pow(2, (midiNoteNumber - 69) / 12);

const frequencyToMidiNoteNumber = (frequency: number) =>
    Math.round(12 * Math.log2(frequency / 440) + 69);

const TestComponent: React.FC = () => {
    const [closestNoteName, setClosestNoteName] = useState('');

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    useEffect(() => {

        // navigator.mediaDevices.getUserMedia({ audio: { deviceId: "input-device-id" } })


        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
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
        const closestNoteName = noteNames[closestMidiNoteNumber % 12];
        setClosestNoteName(closestNoteName);
    };

    return <div> noteName={closestNoteName} </div>;
};

export default TestComponent;
