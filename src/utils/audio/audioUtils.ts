import {ENoteName} from "../../store/types/musicEntities";

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 8192;
analyser.smoothingTimeConstant = 0.2;
analyser.minDecibels = -45;
analyser.maxDecibels = -10;
const frequencyData = new Uint8Array(analyser.frequencyBinCount);

const midiNoteNumberToFrequency = (midiNoteNumber: number) =>
    440 * Math.pow(2, (midiNoteNumber - 69) / 12);

const frequencyToMidiNoteNumber = (frequency: number) =>
    Math.round(12 * Math.log2(frequency / 440) + 69);

function getNoteFrequencies() {
    const noteFrequencies = [];
    for (let i = 0; i < 128; i++) {
        noteFrequencies.push(440 * Math.pow(2, (i - 69) / 12));
    }
    return noteFrequencies;
}

function updateFrequencyData(): NoteAnalyzer {
    analyser.getByteFrequencyData(frequencyData);

    // @ts-ignore
    const maxFrequencyIndex = frequencyData.indexOf(Math.max(...frequencyData));
    const maxFrequency = maxFrequencyIndex * (audioContext.sampleRate / analyser.fftSize);

    if (maxFrequency < 20) {
        return {
            closestNoteName: "",
            closestNoteFrequency: 0,
            closestMidiNoteNumber: 0

        };
    }

    const noteFrequencies = getNoteFrequencies();
    const closestNoteFrequency = noteFrequencies.reduce((prev, curr) => {
        return Math.abs(curr - maxFrequency) < Math.abs(prev - maxFrequency) ? curr : prev;
    });
    const closestMidiNoteNumber = frequencyToMidiNoteNumber(closestNoteFrequency);
    const closestNoteName = Object.values(ENoteName)[closestMidiNoteNumber % 12];

    return {
        closestNoteName: closestNoteName,
        closestNoteFrequency: maxFrequency,
        closestMidiNoteNumber: closestMidiNoteNumber
    };
}

export type NoteAnalyzer = {
    closestNoteName: string,
    closestNoteFrequency: number,
    closestMidiNoteNumber: number
}


export {audioContext, analyser, updateFrequencyData};


