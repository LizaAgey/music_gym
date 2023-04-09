import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import SettingsPage from "./page/SettingsPage";
import InProgressPage from "./page/InProgressPage";
import TestComponent from "./page/TestComponent";
import {useDispatch} from 'react-redux'
import {initializeState} from "./store/slices/preset/slice";
import IntervalsSettingsPage from "./page/IntervalsSettingsPage";
import {presetsInitialData} from "./data/presetData";
import {EPresetMode} from "./store/slices/preset/types";
import {Preset} from "./store/slices/preset/PresetData";
import {ENoteName, getNoteNameEnumValue} from "./store/types/musicEntities";
import {Mode} from "tonal";

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
                        return {value: noteNameEnumValue };
                    })
                } else if (el.type === EPresetMode.DEGREE) {
                    preset.category = el.category;
                    preset.elements = el.elements!.map((n: any) => {
                        return {value: Number(n)}
                    })
                } else if (el.type === EPresetMode.SCALE) {
                    if (el.mode && el.key) {
                        preset.elements = Mode.seventhChords(el.mode, el.key)
                            .map(c => {
                                return {value: c}
                            });
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
                    <Route path="/" element={<SettingsPage/>}/>
                    <Route path="/progress" element={<InProgressPage/>}/>
                    <Route path="/test" element={<TestComponent/>}/>
                    <Route path="/int" element={<IntervalsSettingsPage/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;