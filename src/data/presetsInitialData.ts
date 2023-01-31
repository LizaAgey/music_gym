import { v1 } from "uuid";
import {PresetGroupType} from '../redux/presetsReducer';

export const presetsInitialData: Array<PresetGroupType>  = [
    {
        presetId: "1",
        presetElements: [
            {elementId: v1(), elementValue: 'cat_1', elementSound: './sounds/cat.wav'},
            {elementId: v1(), elementValue: 'dog_1', elementSound: './sounds/dog.wav'},
            {elementId: v1(), elementValue: 'frog_1', elementSound: './sounds/frog.wav'},
            {elementId: v1(), elementValue: 'sheep_1', elementSound: './sounds/sheep.mp3'},
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