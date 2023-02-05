import React from 'react';
import Grid from "@mui/material/Grid";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {PresetElementsList} from "../components/PresetElementsList/PresetElementsList";

function SettingsPage() {
    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={8}>
                    <PresetElementsList/>
                </Grid>
            </Grid>
        </>
    );
}

export default SettingsPage;