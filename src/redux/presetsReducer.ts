import {v1} from 'uuid';
import {ActionsType} from './redux_store';

export type PresetsPageType = {
    animals: Array<PresetElementType>
}
export type PresetElementType = {
    id: string
    value: string
    sound: string
}

export const SELECT_PRESET = 'SELECT_PRESET'

export const selectPresetAС = () => ({type: SELECT_PRESET} as const)

const initialState: PresetsPageType = {
    animals: [
        {id: v1(), value:"cat", sound:"./sounds/cat.wav"},
        {id: v1(), value:"dog", sound:"./sounds/dog.wav"},
        {id: v1(), value:"frog", sound:"./sounds/frog.wav"},
        {id: v1(), value:"sheep", sound:"./sounds/sheep.mp3"},
    ]


}
const profileReducer = (state: PresetsPageType = initialState, action: ActionsType): PresetsPageType => {

    switch (action.type) {
        case SELECT_PRESET:
            return state

        default:
            return state;
    }
};

export default profileReducer