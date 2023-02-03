import {combineReducers, createStore} from 'redux';
import settingsReducer, {
    pauseAС,
    playAС,
    saveSettingsAС, setIntervalAC,
    setPresetsDataToStoreAC,
    setSettingsPresetIdAC, setSoundModeAC, setTrainingPeriodAC
} from './settingsReducer';


export type ActionsType =
    ReturnType<typeof saveSettingsAС>
    | ReturnType<typeof pauseAС>
    | ReturnType<typeof playAС>
    | ReturnType<typeof setSettingsPresetIdAC>
    | ReturnType<typeof setPresetsDataToStoreAC>
    | ReturnType<typeof setTrainingPeriodAC>
    | ReturnType<typeof setIntervalAC>
    | ReturnType<typeof setSoundModeAC>


let rootReducer = combineReducers({
    //each reducer returns new state
    settingsPage: settingsReducer
})
export type AppStateType = ReturnType<typeof rootReducer> // alternative for StateType (made manually)

export const store = createStore(rootReducer)
console.log(store.getState())