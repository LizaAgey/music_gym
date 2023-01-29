import presetsReducer, {selectPresetAС} from './presetsReducer';
import {combineReducers, createStore} from 'redux';


export type ActionsType =
    ReturnType<typeof selectPresetAС>


let rootReducer = combineReducers({
    //each reducer returns new state
    presetsPage: presetsReducer,

})
export type AppStateType = ReturnType<typeof rootReducer> // alternative for StateType (made manually)

export const store = createStore(rootReducer)
console.log(store.getState())