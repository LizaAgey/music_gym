export type SettingsPageType = {
    trainingPeriod: number
    interval: number
    beats: number
    bpm: number
    isInProgress: boolean
    isSoundOn: boolean
    isPaused: boolean
    isShowNext: boolean
    isRandom: boolean
    rawElements: Array<string>
    preset: PresetType
    presetsInitialData: Array<PresetType>
}

export type PresetType = {
    id: number
    title: string
    type: PresetMode
    elements: Array<String | number>
    // elements: Array<PresetElementType>
}

export type PresetElementType = {
    id: number
    value: string
    sound?: string
}

export enum PresetMode {
    NOTE, CHORD, DEGREE, UNDEFINED
}