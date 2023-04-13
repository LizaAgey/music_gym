import React, {useState, useEffect} from 'react';
import MainInProgressPage from "../MainInProgressPage";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import styles from "../../../components/training/MyTimerNew.module.scss";
import MetronomeBeats from "../../../components/training/MetronomeBeats/MetronomeBeats";
import classNames from "classnames";
import {EPresetMode, PresetType} from "../../../store/slices/preset/types";
import {stopProgress} from "../../../store/slices/training/main/slice";


const TestComponent1: React.FC = () => {

    const dispatch = useAppDispatch();
    const {preset, mainTraining, metronome} = useSelector((state: RootState) => state);

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [nextIndex, setNextIndex] = useState<number>(0)

    const [beatCount, setBeatCount] = useState<number>(0);
    const [timer, setTimer] = useState<any>(null);
    const latestCountRef = React.useRef<number>(beatCount);

    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
    const [audio, setAudio] = useState<Array<AudioBuffer> | null>(null);


    const tick = () => {
        setAudio(au => {
            setBeatCount(prevCount => {
                let innerCount = prevCount;

                if (innerCount === metronome.beatsPerMeasure) {
                    innerCount = 0;
                }
                if (innerCount === 0) {

                    if (mainTraining.isSoundOn) {
                        playAudio(au![0]);
                    }

                    setNextIndex((prevValue) => {
                        if (mainTraining.isRandom) {
                            setCurrentIndex(prevValue);
                            const presetsWithPresetId: PresetType = preset.currentPreset;

                            let nextIndex: number = Math.floor(Math.random() * presetsWithPresetId.elements.length);
                            if (nextIndex === prevValue) {
                                nextIndex = Math.floor(Math.random() * presetsWithPresetId.elements.length);
                            }
                            return nextIndex
                        } else {
                            setCurrentIndex(prevValue);
                            if (prevValue === preset.rawElements!.length - 1) {
                                return 0;
                            } else {
                                return prevValue + 1;
                            }
                        }
                    });
                } else {
                    if (mainTraining.isSoundOn) {
                        playAudio(au![1]!);
                    }
                }
                return innerCount + 1;
            });
            return au;
        })

    };

    React.useEffect(() => {
        latestCountRef.current = beatCount;
    }, [beatCount]);

    const playAudio = (buffer: AudioBuffer) => {
        setAudioCtx(ac => {
            if (ac) {
                const source = ac.createBufferSource();
                const gainNode = ac.createGain();
                gainNode.gain.value = 0.7;

                source.buffer = buffer;
                source.connect(gainNode);
                gainNode.connect(ac.destination);

                source.start(0);
            }
            return ac;
        })

    };


    useEffect(() => {
        const AudioContext = window.AudioContext || window.AudioContext;
        const audioCtx = new AudioContext();
        //
        // const click1 = new Audio('./sounds/metronome/click3.wav');
        // const click2 = new Audio('./sounds/metronome/click4.flac');

        const click1 = new Audio('./sounds/metronome/click3.wav');
        const click2 = new Audio('./sounds/metronome/click2.mp3');

        setAudioCtx(audioCtx);

        const loadAudio = async (audio: HTMLAudioElement): Promise<AudioBuffer> => {
            const response = await fetch(audio.src);
            const arrayBuffer = await response.arrayBuffer();
            return await audioCtx.decodeAudioData(arrayBuffer);
        };

        Promise.all([loadAudio(click1), loadAudio(click2)]).then((buffers) => {
            const [click1Buffer, click2Buffer] = buffers;
            setAudio([click1Buffer, click2Buffer])
        }).then(() => setTimer(setInterval(() => tick(), (60 / metronome.bpm) * 1000)));

        return () => {
            clearInterval(timer);
            dispatch(stopProgress());
        };

    }, []);

    useEffect(() => {
        if (timer) {
            if (mainTraining.isPaused) {
                clearInterval(timer);
            } else {
                setTimer(setInterval(() => tick(), (60 / metronome.bpm) * 1000));
            }
        }

    }, [mainTraining.isPaused])


    const isNote = () => {
        return preset.currentPreset.type === EPresetMode.NOTE;
    }


    return (
        <div>

            {mainTraining.isInProgress
                ?
                <div className={styles.mainContainer}>
                    <div>
                        <div>
                            <MetronomeBeats currentBeat={beatCount} beatsPerMeasure={metronome.beatsPerMeasure}/>
                        </div>
                    </div>
                    <div className={styles.elementContainer}>
                        <div className={classNames(
                            styles.current,
                            isNote() ? styles["current--note"] : styles["current--chord"]
                        )}>
                            {preset.rawElements?.[currentIndex]}
                        </div>
                        {mainTraining.isShowNext &&
                            <div className={classNames(
                                styles.next,
                                isNote() ? styles["next--note"] : styles["next--chord"]
                            )}>
                                {preset.rawElements?.[nextIndex]}
                            </div>}
                    </div>
                    <div className={classNames(styles.degree)}>
                        {
                            preset.currentPreset.type === EPresetMode.DEGREE
                                ? <div>{preset.currentPreset.elements[currentIndex].value}</div>
                                : null
                        }
                    </div>
                </div>
                : null}

        </div>
    );
};

export default TestComponent1;