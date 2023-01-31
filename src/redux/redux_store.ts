import presetsReducer, {selectPresetAС, setPresetsAC} from './presetsReducer';
import {combineReducers, createStore} from 'redux';
import {pauseAС, playAС, saveSettingsAС} from './settingsReducer';


export type ActionsType =
    ReturnType<typeof selectPresetAС>
    | ReturnType<typeof setPresetsAC>
    | ReturnType<typeof saveSettingsAС>
    | ReturnType<typeof pauseAС>
    | ReturnType<typeof playAС>



let rootReducer = combineReducers({
    //each reducer returns new state
    presetsPage: presetsReducer,

})
export type AppStateType = ReturnType<typeof rootReducer> // alternative for StateType (made manually)

export const store = createStore(rootReducer)
console.log(store.getState())