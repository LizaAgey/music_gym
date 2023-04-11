import {EModeName, ENoteName} from "../../types/musicEntities";
import {ChordType} from "@tonaljs/chord-type";
import {Preset} from "./PresetData";

export interface PresetsDataType {
    currentPreset: Preset
    allPresets: Array<Preset>
    rawElements?: Array<string>,
}

export type PresetType = {
    id: number
    title: string
    type: EPresetMode
    elements: Array<NoteElementType | ChordElementType | DegreeElementType | ScaleElementType>
    category?: ECategory
}

export type PresetElementType = {
    id?: number
    sound?: string
}

export type Progression = {
    key: ENoteName
    seventhChords: boolean
    mode: string,
    progression: Array<number>
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

export type ScaleElementType = PresetElementType & {
    value: ENoteName,
    mode: EModeName
}

export enum EPresetMode {
    NOTE, CHORD, DEGREE, SCALE, UNDEFINED
}

export enum ECategory {
    POP = 'Pop', BLUES = 'Blues', JAZZ = 'Jazz', TEST = 'test'
}