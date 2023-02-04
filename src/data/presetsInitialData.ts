import { v1 } from "uuid";
import {PresetType} from "../store/slices/settings/types";

export const presetsInitialData: Array<PresetType>  = [
    {
        id: 1,
        elements: [
            {id: 1, value: 'кошка', sound: './sounds/cat.wav'},
            {id: 2, value: 'собака', sound: './sounds/dog.wav'},
            {id: 3, value: 'дятел', sound: './sounds/dog.wav'},
            {id: 4, value: 'козел', sound: './sounds/dog.wav'},
            {id: 5, value: 'обезьяна', sound: './sounds/dog.wav'},
            {id: 6, value: 'жопа', sound: './sounds/dog.wav'},
            {id: 7, value: 'сиська', sound: './sounds/frog.wav'},
            {id: 8, value: 'жорка', sound: './sounds/sheep.mp3'},
        ],
        name: 'Preset 1'
    },
    {
        id: 2,
        elements: [
            {id: 1, value: 'cat_2', sound: './sounds/cat.wav'},
            {id: 2, value: 'dog_2', sound: './sounds/dog.wav'},
            {id: 3, value: 'frog_2', sound: './sounds/frog.wav'},
            {id: 4, value: 'sheep_2', sound: './sounds/sheep.mp3'},
        ],
        name: 'Preset 2'
    }
]