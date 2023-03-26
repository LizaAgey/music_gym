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
    key?: string
    presetsInitialData: Array<PresetType>
}

export type PresetType = {
    id: number
    title: string
    type: EPresetMode
    elements: Array<String | number>
    category?: ECategory
    // elements: Array<PresetElementType>
}

export type PresetElementType = {
    id: number
    value: string
    sound?: string
}

export enum EPresetMode {
    NOTE, CHORD, DEGREE, UNDEFINED
}

export enum ECategory {
    POP= 'Pop', BLUES = 'Blues', JAZZ = 'Jazz'
}