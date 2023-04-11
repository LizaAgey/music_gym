import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import TrainingSettingsPage from "./page/TrainingSettingsPage";
import TestComponent from "./page/TestComponent";
import {useDispatch} from 'react-redux'
import {initializeState} from "./store/slices/preset/slice";
import IntervalFunctionsModeInProgressPage
    from "./page/progress/IntervalFunctionsModeInProgressPage/IntervalFunctionsModeInProgressPage";
import {presetsInitialData} from "./data/presetData";
import {EPresetMode} from "./store/slices/preset/types";
import {Preset} from "./store/slices/preset/PresetData";
import {EModeName, ENoteName, getNoteNameEnumValue} from "./store/types/musicEntities";
import {Mode} from "tonal";
import MetronomeModeInProgressPage from "./page/progress/MetronomeModeInProgressPage/MetronomeModeInProgressPage";
import MainInProgressPage from "./page/progress/MainInProgressPage";
import NotFoundPage from "./page/NotFoundPage";
import {HOME, PROGRESS, METRONOME, INTERVALS, SETTINGS} from "./constants/routes";
import TestComponent1 from "./page/progress/MetronomeModeInProgressPage/TestComponent1";
import {PersonalSettingsPage} from "./components/Sidebar/settings/personal/PersonalSettingsPage";

function App() {
    const dispatch = useDispatch()

    React.useEffect(() => {
        const arr: Array<Preset> = presetsInitialData.map(el => {
                let preset = new Preset();
                preset.title = el.title;
                preset.type = el.type;
                if (el.type === EPresetMode.NOTE) {
                    preset.elements = el.elements!.map((n: any) => {
                        let noteNameEnumValue = getNoteNameEnumValue(n);
                        return {value: noteNameEnumValue};
                    })
                } else if (el.type === EPresetMode.DEGREE) {
                    preset.category = el.category;
                    preset.elements = el.elements!.map((n: any) => {
                        return {value: Number(n)}
                    })
                    preset.progression = {
                        key: ENoteName.C,
                        seventhChords: true,
                        mode: EModeName.IONIAN,
                        progression: el.elements!.map(e => Number(e))
                    }
                } else if (el.type === EPresetMode.SCALE) {
                    if (el.mode && el.key) {
                        preset.elements = Mode.seventhChords(el.mode, el.key)
                            .map(c => {
                                return {value: c}
                            });
                        preset.progression = {
                            key: el.key,
                            seventhChords: true,
                            mode: el.mode,
                            progression: []
                        }
                    }
                }
                return preset;
            }
        );

        dispatch(initializeState(arr))
    }, [])

    return (
        <>
            <div className="app">
                <Routes>
                    <Route path={HOME} element={<TrainingSettingsPage/>}/>
                    <Route path={SETTINGS} element={<PersonalSettingsPage/>}/>
                    <Route path={PROGRESS} element={<MainInProgressPage/>}>
                        {/*<Route path={METRONOME} element={<TestComponent1/>}/>*/}
                        <Route path={METRONOME} element={<MetronomeModeInProgressPage/>}/>
                        <Route path={INTERVALS} element={<IntervalFunctionsModeInProgressPage/>}/>
                    </Route>

                    <Route path="/test" element={<TestComponent/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>

                </Routes>
            </div>
        </>
    );
}

export default App;