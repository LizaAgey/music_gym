export type SettingsPageType = {
    trainingPeriod: number
    interval: number
    beats: number
    bpm: number
    isInProgress: boolean
    isSoundOn: boolean
    isPaused: boolean
    preset: PresetType
    presetsInitialData: Array<PresetType>
}

export type PresetType = {
    id: number
    name: string
    elements: Array<PresetElementType>
}

export type PresetElementType = {
    id: number
    value: string
    sound: string
}