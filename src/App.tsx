import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import {Sidebar} from "./components/Sidebar/Sidebar";
import {MyTimerNew} from "./components/Timer/MyTimerNew";


function App() {
    return (
        <div className="App">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={8}>
                    <MyTimerNew/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;