import React, {useState, useEffect} from 'react';
import MainInProgressPage from "../MainInProgressPage";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import styles from "../../../components/Timer/MyTimerNew.module.scss";
import MetronomeBeats from "../../../components/MetronomeBeats/MetronomeBeats";
import classNames from "classnames";
import {EPresetMode, PresetType} from "../../../store/slices/preset/types";
import {stopProgress} from "../../../store/slices/settings/slice";
import {getRandomIndex} from "../../../utils/collections";


const MetronomeModeInProgressPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const {preset, settings, metronome} = useSelector((state: RootState) => state);

    // TODO: Default value = 0 to reduce rerender when init
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [nextIndex, setNextIndex] = useState<number>(1)

    const [beatCount, setBeatCount] = useState<number>(0);
    const [timer, setTimer] = useState<any>(null);

    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
    const [audio, setAudio] = useState<Array<AudioBuffer> | null>(null);

    const [firstIteration, setFirstIteration] = useState<boolean>(true);

    const [precount, setPrecount] = useState(4); // Number of precount beats
    const [countdown, setCountdown] = useState(precount);
    const [isPrecounting, setIsPrecounting] = useState(true); // Boolean to indicate if precount is in progress
    const [precountMessage, setPrecountMessage] = useState("Get your instrument ready, we're about to begin..."); // Boolean to indicate if precount is in progress


    useEffect(() => {
        const AudioContext = window.AudioContext || window.AudioContext;
        const audioCtx = new AudioContext();

        const click1 = new Audio('/sounds/metronome/click3.wav');
        const click2 = new Audio('/sounds/metronome/click2.mp3');
        const click3 = new Audio('/sounds/gong.flac');

        setAudioCtx(audioCtx);

        const loadAudio = async (audio: HTMLAudioElement): Promise<AudioBuffer> => {
            const response = await fetch(audio.src);
            const arrayBuffer = await response.arrayBuffer();
            return await audioCtx.decodeAudioData(arrayBuffer);
        };

        Promise.all([loadAudio(click1), loadAudio(click2), loadAudio(click3)])
            .then((buffers) => {
                const [click1Buffer, click2Buffer, click3Buffer] = buffers;
                setAudio([click1Buffer, click2Buffer, click3Buffer])
            })
            .then(() => preCount());

        return () => {
            clearInterval(timer);
            dispatch(stopProgress());
        };
    }, []);

    async function preCount() {
        if (settings.isRandom) {
            let currentIndex: number = getRandomIndex(preset.rawElements!);
            setCurrentIndex(currentIndex);
            setNextIndex(getRandomIndex(preset.rawElements!, currentIndex));
        } else {
            setCurrentIndex(0);
            setNextIndex(1);
        }

        await precountTick()

        tick(); // one instant click
        setTimer(setInterval(() => tick(), (60 / metronome.bpm) * 1000)) // main run
        setIsPrecounting(false);
    }

    async function precountTick() {
        return new Promise((resolve) => {
            setTimeout(() => {
                setAudio(au => {
                    const tickTime = (60 / metronome.bpm) * 1000;
                    setTimeout(() => {
                        playAudio(au![1]);
                    }, tickTime);
                    setTimeout(() => {
                        playAudio(au![1]);
                    }, tickTime * 2);
                    setTimeout(() => {
                        playAudio(au![1]);
                    }, tickTime * 3);
                    setTimeout(() => {
                        playAudio(au![1]);
                    }, tickTime * 3.5);
                    setTimeout(() => {
                        playAudio(au![1]);
                    }, tickTime * 4);
                    setTimeout(() => {
                        playAudio(au![1]);
                    }, tickTime * 4.5);
                    setTimeout(() => {
                        playAudio(au![1]);
                        resolve("");
                    }, tickTime * 5);

                    return au;
                })
            }, 3000);
        });

    }


    const tick = () => {
        setAudio(au => {

            setFirstIteration(fi => {
                setBeatCount(prevCount => {
                    let innerCount = prevCount;
                    if (fi && !innerCount) {
                        playAudio(au![1]);
                        playAudio(au![2]);
                        return 1;
                    }

                    if (innerCount === metronome.beatsPerMeasure) {
                        innerCount = 0;
                    }
                    if (innerCount === 0) {

                        setNextIndex((prevValue) => {
                            if (settings.isRandom) {
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
                                    return prevValue! + 1;
                                }
                            }
                        });
                        if (settings.isSoundOn) {
                            playAudio(au![0]);
                        }
                    } else {
                        if (settings.isSoundOn) {
                            playAudio(au![1]);
                        }
                    }
                    return innerCount + 1;
                });
                return false;

            });
            return au;
        })

    };

    const playAudio = (buffer: AudioBuffer) => {
        setAudioCtx(ac => {
            if (ac) {
                const source = ac.createBufferSource();
                const gainNode = ac.createGain();
                gainNode.gain.value = 0.3;

                source.buffer = buffer;
                source.connect(gainNode);
                gainNode.connect(ac.destination);

                source.start(0);
            }
            return ac;
        })
    };

    useEffect(() => {
        if (timer) {
            if (settings.isPaused) {
                clearInterval(timer);
            } else {
                setTimer(setInterval(() => tick(), (60 / metronome.bpm) * 1000));
            }
        }
    }, [settings.isPaused])

    const isNote = () => {
        return preset.currentPreset.type === EPresetMode.NOTE;
    }

    return (
        <div>
            <div className={styles.mainContainer}>
                {!isPrecounting
                    ? <MetronomeBeats currentBeat={beatCount} beatsPerMeasure={metronome.beatsPerMeasure}/>
                    : 'PRECOUNT'
                }
                <div className={styles.elementContainer}>
                    <div className={classNames(
                        styles.current,
                        isNote() ? styles["current--note"] : styles["current--chord"]
                    )}>
                        {preset.rawElements?.[currentIndex]}
                    </div>
                    {settings.isShowNext &&
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

        </div>
    );
};

export default MetronomeModeInProgressPage;