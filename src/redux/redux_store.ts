import {combineReducers, createStore} from 'redux';
import settingsReducer, {
    switchPauseAС,
    playAС,
    saveSettingsAС,
    setPresetsDataToStoreAC,
    setSettingsPresetIdAC,
    stopAС,
} from './settingsReducer';


export type ActionsType =
    ReturnType<typeof saveSettingsAС>
    | ReturnType<typeof switchPauseAС>
    | ReturnType<typeof playAС>
    | ReturnType<typeof setSettingsPresetIdAC>
    | ReturnType<typeof setPresetsDataToStoreAC>
    | ReturnType<typeof stopAС>
    // | ReturnType<typeof setTrainingPeriodAC>
    // | ReturnType<typeof setIntervalAC>
    // | ReturnType<typeof setSoundModeAC>


let rootReducer = combineReducers({
    //each reducer returns new state
    settingsPage: settingsReducer
})
export type AppStateType = ReturnType<typeof rootReducer> // alternative for StateType (made manually)

export const store = createStore(rootReducer)
console.log(store.getState())