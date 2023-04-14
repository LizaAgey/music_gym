import * as ml5 from 'ml5'

let audioContext;
let mic;
let pitch;
let stream;

export async function setup() {
    audioContext = new AudioContext();
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    startPitch(stream, audioContext);
}

function startPitch(stream, audioContext) {
    pitch = ml5.pitchDetection('/model', audioContext , stream, modelLoaded);
}

function modelLoaded() {
    document.querySelector('#status').textContent='Model Loaded';
    getPitch();
}

function getPitch() {
    pitch.getPitch(function(err, frequency) {
        if(err) {
            console.log(err);
        }
        if (frequency) {
            document.querySelector('#result').textContent = frequency;
        } else {

            document.querySelector('#result').textContent = 'No pitch detected ';
        }
        getPitch();
    }).catch((e) =>{
        console.log(e)
    })
}

