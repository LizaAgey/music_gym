import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import MyTimerContainer from "./components/Timer/MyTimerContainer";


function App() {
    return (
        <div className="App">
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <SidebarContainer/>
                </Grid>
                <Grid item xs={8}>
                    <MyTimerContainer/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;

/*
const onKeyUpHandler = (event: KeyboardEvent<HTMLDivElement>) => {

    for (let i = 0; i < props.items.length; i++) {

        if (event.key === 'Escape' || event.key === 'Enter') {
            setExpanded(false)
        }
    }
};

<div className={styles.selectWrapper} tabIndex={0} onKeyUp={onKeyUpHandler}>
*/
