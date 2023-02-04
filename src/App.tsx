import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import {Sidebar} from "./components/Sidebar/Sidebar";
import {MyTimer} from "./components/Timer/MyTimer";


function App() {
    return (
        <div className="App">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={8}>
                    <MyTimer/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;