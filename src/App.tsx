import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import DisplayContainer from './components/Display/DisplayContainer';


function App() {
    return (
        <div className="App">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <SidebarContainer/>
                </Grid>
                <Grid item xs={8}>
                    <DisplayContainer/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
