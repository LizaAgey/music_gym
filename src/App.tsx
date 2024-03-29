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
import {HOME, INTERVALS, METRONOME, PROGRESS, SETTINGS, TEST} from "./constants/routes";
import {PersonalSettingsPage} from "./components/Sidebar/settings/personal/PersonalSettingsPage";
import MainLayout from "./page/MainLayout";
import {PrivateRoute} from "./features/auth/PrivateRoute";
import TestComponent1 from "./page/TestComponent1";

function App() {

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(initializeState(getInitialPresets()))
    }, [])

    return (
        <>
            <div className="app">
                <Routes>
                    <Route path={HOME} element={<MainLayout/>}>
                        <Route index element={<TrainingSettingsPage/>}/>
                        <Route path={TEST} element={<TestComponent/>}/>
                        <Route path="test1" element={<TestComponent1/>}/>
                        {/*<Route path={TUNER} element={<GuitarTuner/>}/>*/}

                        <Route path='private' element={<PrivateRoute/>}>
                            <Route path={SETTINGS} element={<PersonalSettingsPage/>}/>
                        </Route>

                    </Route>

                    <Route path={PROGRESS} element={<MainInProgressPage/>}>
                        <Route path={METRONOME} element={<MetronomeModeInProgressPage/>}/>
                        <Route path={INTERVALS} element={<IntervalFunctionsModeInProgressPage/>}/>
                    </Route>

                    <Route path="*" element={<NotFoundPage/>}/>

                </Routes>
            </div>
        </>
    );
}

const getInitialPresets = (): Array<Preset> => {
    return presetsInitialData.map(el => {
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
    });
}

export default App;