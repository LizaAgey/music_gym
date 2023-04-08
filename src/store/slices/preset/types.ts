import {ENoteName} from "../../types/musicEntities";
import {ChordType} from "@tonaljs/chord-type";

export type PresetsDataType = {
    presetId: number
    currentPreset: PresetType
    allPresets: Array<PresetType>
    rawElements?: Array<string>,
}

export type PresetType = {
    id: number
    title: string
    type: EPresetMode
    elements: Array<NoteElementType | ChordElementType | DegreeElementType>
    category?: ECategory
}

export type PresetElementType = {
    id?: number
    sound?: string
}

export type NoteElementType = PresetElementType & {
    value: ENoteName
}

export type ChordElementType = PresetElementType & {
    value: string
}

export type DegreeElementType = PresetElementType & {
    value: number
}

export enum EPresetMode {
    NOTE, CHORD, DEGREE, UNDEFINED
}

export enum ECategory {
    POP= 'Pop', BLUES = 'Blues', JAZZ = 'Jazz'
}