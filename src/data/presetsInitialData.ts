import { v1 } from "uuid";

export type PresetElementType = {
    elementId: string
    elementValue: string
    elementSound: string
}
export type PresetGroupType = {
    presetId: string
    presetElements: Array<PresetElementType>
    presetName: string
}

export type PresetsInitialDataType = Array<PresetGroupType>

export const presetsInitialData: PresetsInitialDataType  = [
    {
        presetId: "1",
        presetElements: [
            {elementId: v1(), elementValue: 'кошка', elementSound: './sounds/cat.wav'},
            {elementId: v1(), elementValue: 'собака', elementSound: './sounds/dog.wav'},
            {elementId: v1(), elementValue: 'дятел', elementSound: './sounds/dog.wav'},
            {elementId: v1(), elementValue: 'козел', elementSound: './sounds/dog.wav'},
            {elementId: v1(), elementValue: 'обезьяна', elementSound: './sounds/dog.wav'},
            {elementId: v1(), elementValue: 'жопа', elementSound: './sounds/dog.wav'},
            {elementId: v1(), elementValue: 'сиська', elementSound: './sounds/frog.wav'},
            {elementId: v1(), elementValue: 'жорка', elementSound: './sounds/sheep.mp3'},
        ],
        presetName: 'Preset 1'
    },
    {
        presetId: "2",
        presetElements: [
            {elementId: v1(), elementValue: 'cat_2', elementSound: './sounds/cat.wav'},
            {elementId: v1(), elementValue: 'dog_2', elementSound: './sounds/dog.wav'},
            {elementId: v1(), elementValue: 'frog_2', elementSound: './sounds/frog.wav'},
            {elementId: v1(), elementValue: 'sheep_2', elementSound: './sounds/sheep.mp3'},
        ],
        presetName: 'Preset 2'
    }
]