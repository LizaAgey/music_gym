import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import SettingsPage from "./page/SettingsPage";
import InProgressPage from "./page/InProgressPage";
import TestComponent from "./page/TestComponent";


function App() {
    return (
        <>
            <div className="app">
                <Routes>
                    <Route path="/" element={<SettingsPage/>}/>
                    <Route path="/progress" element={<InProgressPage/>}/>
                    <Route path="/test" element={<TestComponent/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;