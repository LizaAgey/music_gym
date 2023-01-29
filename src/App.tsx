import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Display from './components/Display/Display';
import Grid from '@mui/material/Grid';

function App() {
    return (
        <div className="App">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={8}>
                    <Display/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
