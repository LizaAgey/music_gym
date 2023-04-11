export type TrainingState = {
    isInProgress: boolean
    isSoundOn: boolean
    isPaused: boolean
    isShowNext: boolean
    isRandom: boolean
    trainingMode: ETrainingMode
}

export enum ETrainingMode {
    METRONOME, INTERVAL_FUNCTIONS
}
